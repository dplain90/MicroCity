import {combineReducers} from 'redux';
import TogglesReducer from './toggles_reducer';
import CodeReducer from './code_reducer';
import LevelsReducer from './levels_reducer';
import LevelReducer from './level_reducer';
import InstructionReducer from './instruction_reducer';
import StageReducer from './stage_reducer';

const RootReducer = combineReducers({
  toggles: TogglesReducer,
  code: CodeReducer,
  levels: LevelsReducer,
  level: LevelReducer,
  instruction: InstructionReducer,
  stages: StageReducer
});

export default RootReducer;
