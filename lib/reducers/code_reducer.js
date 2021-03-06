
import { UPDATE_CODE, REMOVE_CODE, RECEIVE_ARG, CLEAR_CODE } from '../actions/code_actions';

const _defaultCode = {};

const CodeReducer = (state = _defaultCode, action) => {
  switch(action.type) {
    case UPDATE_CODE:
      // let UpdatedCode = Object.assign({}, action.code);
      return action.code;
    case CLEAR_CODE:
      return _defaultCode;
    case REMOVE_CODE:
        let newCode = Object.assign({}, state);
        delete newCode[action.id];
      return newCode;
    case RECEIVE_ARG:
      let argCode = Object.assign({}, state);
      argCode[action.id].args = [action.arg];
      return argCode;
    default:
      return state;
  }
};

export default CodeReducer;
