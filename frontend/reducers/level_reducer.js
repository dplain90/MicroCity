import { UPDATE_LEVEL, RECEIVE_LEVEL } from '../actions/level_actions';
import { level1 } from '../data/levels/level_1.js';

const _defaultLevel= Object.freeze(level1);

const LevelReducer = (state = _defaultLevel, action) => {
  switch(action.type) {
    case RECEIVE_LEVEL:
      debugger
      return action.level;
      break;
    default:
      return state;
  }
};

export default LevelReducer;
