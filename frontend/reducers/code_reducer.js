import { UPDATE_CODE, CLEAR_CODE } from '../actions/code_actions';

const _defaultCode = Object.freeze([]);

const CodeReducer = (state = _defaultCode, action) => {
  switch(action.type) {
    case UPDATE_CODE:
      return action.code;
    case CLEAR_CODE:
      return _default;
    default:
      return state;
  }
};

export default CodeReducer;
