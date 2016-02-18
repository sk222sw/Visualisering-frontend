import initialState from '../initial-state';

export default (currentState = initialState.settings, action) => {
  switch(action.type) {
  default: return currentState;
  }
};