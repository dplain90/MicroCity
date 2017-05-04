import { UPDATE_LEVEL} from '../actions/code_actions';
import { levelDirectory } from '../util/level_util';

const _defaultLevel= Object.freeze({
  completed: false,
  description: "",
  title: "",
  number: 1
});

const LevelReducer = (state = _defaultLevels, action) => {
  switch(action.type) {
    case UPDATE_LEVEL:
      updatedLevel = Object.assign({}, state, action.level);
      return updatedLevel;
    default:
      return state;
  }
};

export default LevelsReducer;
