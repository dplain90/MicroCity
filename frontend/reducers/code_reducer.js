import { UPDATE_CODE, CLEAR_CODE, REMOVE_CODE, RECEIVE_ARG } from '../actions/code_actions';

const _defaultCode = Object.freeze({});

const CodeReducer = (state = _defaultCode, action) => {
  switch(action.type) {
    case UPDATE_CODE:
      let updatedCode = Object.assign({}, action.code, state);
      return updatedCode;
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
