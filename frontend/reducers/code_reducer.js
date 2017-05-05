import { UPDATE_CODE, CLEAR_CODE, REMOVE_CODE } from '../actions/code_actions';

const _defaultCode = Object.freeze({});

const CodeReducer = (state = _defaultCode, action) => {
  switch(action.type) {
    case UPDATE_CODE:
      return action.code;
    case CLEAR_CODE:
      return _defaultCode;
    case REMOVE_CODE:
      delete state[action.id];
      return state;
    default:
      return state;
  }
};

export default CodeReducer;
