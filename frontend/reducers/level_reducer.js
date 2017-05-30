import { UPDATE_LEVEL, RECEIVE_LEVEL } from '../actions/level_actions';
import { level2 } from '../data/levels/level_2.js';

const _defaultLevel= Object.freeze(level2);

const LevelReducer = (state = _defaultLevel, action) => {
  switch(action.type) {
    case RECEIVE_LEVEL:
      return action.level;
      break;
    default:
      return state;
  }
};

export default LevelReducer;
