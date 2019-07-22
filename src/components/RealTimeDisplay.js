import React from "react";
import { useSelector } from "react-redux";


const displayStyle = {
  fontSize: "15pt",
  fontWeight: "bold",
  borderRadius: "15px",
  backgroundColor: "white",
  margin: "30px",
  padding: "10px",
  boxShadow: "1px 1px 1px 1px darkBlue",
};

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
    <span style={displayStyle}>
      {info.metric}: {info.value} {info.unit}
    </span>
  );
};

export default RealTimeDisplay;
