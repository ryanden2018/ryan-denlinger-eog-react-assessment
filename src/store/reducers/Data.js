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

const handlers = {
  [actions.HISTORY_DATA_RECEIVED]: historyDataReceived,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state,action);
};
