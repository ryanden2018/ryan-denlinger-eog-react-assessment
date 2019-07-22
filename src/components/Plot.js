import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { Provider, createClient, useQuery } from "urql";
import LinearProgress from "@material-ui/core/LinearProgress";

const client = createClient({
  url: "https://react.eogresources.com/graphql"
});

//////////////////////////////////////////////////////////////////////
// Note to reviewier: this seems to be the correct query, however
// I cannot get it to work (400: Bad Request every time). I can only
// obtain a proper result through direct string interpolation, which
// is obviously unsafe. To help alleviate the risk of code injection,
// I am using a filter which rejects all non-alphabetical characters
// for metricName, and I am using parseInt for the timestamps.
//
// const query = `
// query($input: MeasurementQuery!) {
//   getMultipleMeasurements(input: $input) {
//     metric
//     measurements {
//       metric
//       at
//       value
//       unit
//     }
//   }
// }
// `;
//////////////////////////////////////////////////////////////////////

const alphaFilter = (str) => {
  const match = String(str).match(/^[A-Za-z]*$/);
  if(match) {
    return match[0];
  }
  return "";
};

const buildQuery = (metricName,before,after) => `
query {
  getMultipleMeasurements(input: {metricName: "${alphaFilter(metricName)}", before: ${parseInt(before)}, after: ${parseInt(after)}}) {
    metric
    measurements {
      metric
      at
      value
      unit
    }
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
  
  const [result] = useQuery({
    query: buildQuery(
      String(props.metricName),
      parseInt(props.loadTimestamp),
      parseInt(props.loadTimestamp)-thirtyMinutes,
    ),
  });

  const { fetching, data, error } = result;
  
  useEffect(
    () => {
      if (error) {
        dispatch({ type: actions.API_ERROR, error: error.message });
        return;
      }
      if (!data) return;
      const { getMultipleMeasurements } = data;
      console.log(getMultipleMeasurements) /////// FIXME
      //dispatch({ type: actions.HISTORY_DATA_RECEIVED, getHistoryForMetric });
    },
    [dispatch, data, error]
  );

  

  if (fetching) return <LinearProgress />;


  return (
    <div></div>
  );
};
