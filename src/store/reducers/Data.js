import * as actions from "../actions";

const initialState = {
  data: [],
};

const historyDataReceived = (state, action) => {
  const { getMeasurements } = action;
  return {
    ...state,
    data: getMeasurements.map( measurement => {
      return {...measurement};
    }),
  };
};

const newMeasurementReceived = (state, action) => {
  // FIXME: variable thirtyMinutes is defined in two places (cf. /src/components/Plot.js)
  const thirtyMinutes = 30 * 60 * 1000;

  const { newMeasurement } = action;

  if( state.data.length === 0 ) {
    return state;
  }

  if( state.data[0].metric !== newMeasurement.metric ) {
    console.log(state.data[0].metric)
    console.log(newMeasurement.metric)
    return state;
  }

  console.log(newMeasurement)
  const data = state.data.filter( 
    measurement => ( measurement.at > newMeasurement.at - thirtyMinutes )
  );

  data.push(newMeasurement);

  return {
    ...state,
    data: data.map( measurement => {
      return {...measurement};
    }),
  };
};

const intervalDataReceived = (state, action) => {
  const data = state.data;
  const { getLastKnownMeasurement } = action;
  data.push( getLastKnownMeasurement );
  return {
    ...state,
    data: data.matp( measurement => {
      return {...measurement};
    }),
  };
};

const handlers = {
  [actions.HISTORY_DATA_RECEIVED]: historyDataReceived,
  [actions.NEW_MEASUREMENT_RECEIVED]: newMeasurementReceived,
  [actions.INTERVAL_DATA_RECEIVED]: intervalDataReceived,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state,action);
};
