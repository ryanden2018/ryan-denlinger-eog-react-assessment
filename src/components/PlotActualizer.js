import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const getData = (state) => {
  const { data } = state.data;
  return data.map( measurement => {
    return {
      ...measurement,
      at: (new Date(measurement.at))
        .toTimeString()
        .match(/^\d\d:\d\d/)[0],
    };
  });
};

const PlotActualizer = () => {
  const data = useSelector(
    getData
  );

  if( !data ) return <div></div>;

  if( data.length === 0 ) return <div></div>;

  return (
    <LineChart
      width={500}
      height={300}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="at" />
      <YAxis unit={data[0].unit} type="number" domain={['auto','auto']} />
      <Tooltip />
      <Legend />
      <Line name={data[0].metric} unit={data[0].unit} type="monotone" dot={false} dataKey="value" stroke="#000000" />
    </LineChart>
  );
  
};

export default PlotActualizer;
