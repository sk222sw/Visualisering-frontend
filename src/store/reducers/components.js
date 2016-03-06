import C from "../../constants";
import initialState from "../initial-state";
import assign from "lodash/assign";

export default (currentState = initialState.components, action) => {
  switch (action.type) {
  case C.BACKEND_DATA:
    return assign(
      {},
      currentState,
      action.data
    );
  default: return currentState;
  }
};
