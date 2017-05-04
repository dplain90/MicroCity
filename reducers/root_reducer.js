import {combineReducers} from 'redux';
import TogglesReducer from './toggles_reducer';
import CodeReducer from './code_reducer';
import LevelsReducer from './levels_reducer';
import LevelReducer from './level_reducer';

const RootReducer = combineReducers({
  toggles: TogglesReducer,
  code: CodeReducer,
  levels: LevelsReducer,
  level: LevelReducer
});

export default RootReducer;
