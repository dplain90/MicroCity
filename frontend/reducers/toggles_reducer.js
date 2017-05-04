import { UPDATE_TOGGLE } from '../actions/toggle_actions';

const _defaultCode = Object.freeze({
  paletteType: 'text'

});

const CodeReducer = (state = _defaultCode, action) => {
  switch(action.type) {
    case UPDATE_TOGGLE:
      let updatedToggles = Object.assign({}, state, action.toggle);
      return updatedToggles;
    default:
      return state;
  }
};

export default CodeReducer;
