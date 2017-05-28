import { UPDATE_LEVEL, RECEIVE_LEVEL} from '../actions/code_actions';
import { level1 } from '../data/levels/level_1.js';

const _defaultLevel= Object.freeze(level1);

const LevelReducer = (state = _defaultLevel, action) => {
  switch(action.type) {
    case RECEIVE_LEVEL:
      return action.level;
    default:
      return state;
  }
};

export default LevelReducer;
