import React from "react";
import { useSelector } from "react-redux";

const getInfo = (state) => {
  const { data } = state.data;
  if( data.length === 0 ) {
    return null;
  }
  const { metric, value, unit } = data[0];
  return { metric, value, unit };
};

const RealTimeDisplay = () => {
  const info = useSelector(
    getInfo
  );

  if( !info ) return <div></div>;

  return (
    <div>
      {info.metric}: {info.value} {info.unit}
    </div>
  );
};

export default RealTimeDisplay;
