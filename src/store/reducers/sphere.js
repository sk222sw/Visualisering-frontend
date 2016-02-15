import C from '../../constants';
import initialState from '../initial-state';

export default (currentState = initialState.sphere, action) => {
    switch(action.type) {
    case C.DISMISS_MESSAGE:
        return Object.assign(
            {},
            currentState,
            {
                message: null,
                isError: false
            }
        );
    case C.DISPLAY_MESSAGE:
        return Object.assign(
            {},
            currentState,
            {
                message: action.message,
                isError: false
            }
        );
    case C.DISPLAY_ERROR:
        return Object.assign(
            {},
            currentState,
            {
                message: action.message,
                isError: true
            }
        );
    default: return currentState;
    }
};