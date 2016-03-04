import C from "../../constants";
import initialState from "../initial-state";

export default (currentState = initialState.components, action) => {
  switch (action.type) {
  case C.BACKEND_DATA:
    return Object.assign(
      {},
      currentState,
      action.data
    );
  default: return currentState;
  }
};
