import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import { Provider, createClient, useQuery } from "urql";
import LinearProgress from "@material-ui/core/LinearProgress";
import PlotActualizer from "./PlotActualizer";

const client = createClient({
  url: "https://react.eogresources.com/graphql"
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

  const { fetching, data, error } = result;
  
  useEffect(
    () => {
      if (error) {
        dispatch({ type: actions.API_ERROR, error: error.message });
        return;
      }
      if (!data) return;
      const { getMeasurements } = data;
      console.log(getMeasurements)
      dispatch({ type: actions.HISTORY_DATA_RECEIVED, getMeasurements });
    },
    [dispatch, data, error]
  );

  if (fetching) return <LinearProgress />;

  return <PlotActualizer />;
};
