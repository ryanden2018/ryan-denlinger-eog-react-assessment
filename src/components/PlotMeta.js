/** Use the PlotMeta component instead of the Plot component
 * to ensure that the timestamp is correctly obtained
 * server-side from the heartBeat query, instead of
 * client-side which could be in error.
 */
import React from "react";
import { Provider, createClient, useQuery } from "urql";
import Plot from "./Plot";
import LinearProgress from "@material-ui/core/LinearProgress";

const client = createClient({
  url: "https://react.eogresources.com/graphql"
});

const query = `
query {
  heartBeat
}
`;

export default (props) => {
  return (
    <Provider value={client}>
      <PlotMeta {...props} />
    </Provider>
  );
}

const PlotMeta = (props) => {
  const [result] = useQuery({
    query,
  });

  const { fetching, data, error } = result;

  // TODO: implement proper error handling
  if (fetching || error || !data) return <LinearProgress />;

  return (
    <Plot {...props} loadTimestamp={data.heartBeat} />
  );
};
