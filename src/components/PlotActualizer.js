import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { scaleTime } from 'd3-scale';

const getData = (state) => {
  const { data } = state.data;
  return data.map( measurement => {
    return {
      ...measurement,
      at: (new Date(measurement.at))
        //.toTimeString()
        //.match(/^\d\d:\d\d/)[0],
    };
  });
};

const timeScale = scaleTime()
.domain([new Date(2019,6,22,11,0),new Date(2019,6,23,12,0)])
.range([0,100000000]);

const PlotActualizer = () => {
  const data = useSelector(
    getData
  );

  if( !data ) return <div></div>;

  if( data.length === 0 ) return <div></div>;

  return (
    <LineChart
      width={600}
      height={400}
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="at" type="utc" domain={[new Date(2019,6,22,11,0),new Date(2019,6,22,12,0)]} />
      <YAxis unit={data[0].unit} type="number" />
      <Tooltip />
      <Legend />
      <Line name={data[0].metric} unit={data[0].unit} type="monotone" dot={false} dataKey="value" stroke="#000000" />
    </LineChart>
  );
  
};

export default PlotActualizer;
