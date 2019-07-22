import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const getData = state => {
  const { data } = state.data;
  return data.map( measurement => {
    return {...measurement};
  });
};

const PlotActualizer = () => {
  const data = useSelector(
    getData
  );

  if( !data ) return <div></div>;

  //return <div><ul>{data.map(measurement => <li>{measurement.at} : {measurement.value}</li>)}</ul></div>;

  return (
    <LineChart
      width={500}
      height={300}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="at" />
      <YAxis type="number" domain={['auto','auto']} />
      <Tooltip />
      <Line type="monotone" dot={false} dataKey="value" stroke="#000000" />
    </LineChart>
  );
  
};

export default PlotActualizer;
