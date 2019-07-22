import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import { 
  Provider,
  createClient, 
  useQuery,
  subscriptionExchange,
  cacheExchange,
  debugExchange,
  fetchExchange,
  useSubscription,
} from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import LinearProgress from "@material-ui/core/LinearProgress";
import PlotActualizer from "./PlotActualizer";

const subscriptionClient = new SubscriptionClient(
  'wss://react.eogresources.com/graphql',
  {}
);

const client = createClient({
  url: "https://react.eogresources.com/graphql",
  exchanges: [
    debugExchange,
    cacheExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation),
    }),
  ],
});


const query = `
query($input: MeasurementQuery!) {
  getMeasurements(input: $input) {
    metric
    at
    value
    unit
  }
}
`;

const subscriptionQuery = `
subscription {
  newMeasurement {
    metric
    at
    value
    unit
  }
}
`;

export default (props) => {
  return (
    <Provider value={client}>
      <Plot {...props} />
    </Provider>
  );
}

const Plot = (props) => {
  const thirtyMinutes = 30 * 60 * 1000;

  const dispatch = useDispatch();
  
  const input = {
    metricName: String(props.metricName),
    before: parseInt(props.loadTimestamp),
    after: parseInt(props.loadTimestamp)-thirtyMinutes,
  };

  const [result] = useQuery({
    query,
    variables: {
      input,
    },
  });

  // I 100% do not understand these two arguments but this code seems to work...
  // also how do we delete subscriptions upon unmount ????? (TODO/FIXME)
  const handleSubscription = (thingOne,thingTwo) => {
    const { newMeasurement } = thingTwo;
    dispatch({ type: actions.NEW_MEASUREMENT_RECEIVED, newMeasurement });
  };
  useSubscription(
    { query: subscriptionQuery },
    handleSubscription,
  );

  const { fetching, data, error } = result;
  
  useEffect(
    () => {
      if (error) {
        dispatch({ type: actions.API_ERROR, error: error.message });
        return;
      }
      if (!data) return;
      const { getMeasurements } = data;
      dispatch({ type: actions.HISTORY_DATA_RECEIVED, getMeasurements });
    },
    [dispatch, data, error]
  );

  if (fetching) return <LinearProgress />;

  return <PlotActualizer />;
};
