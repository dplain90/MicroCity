import { UPDATE_LEVEL, RECEIVE_LEVEL } from '../actions/level_actions';
import { instructions1 } from '../data/levels/level_1/instruction_1';
import { RECEIVE_INSTRUCTION } from '../actions/instruction_actions';
import { instructionDirectory } from '../data/levels/instruction_directory';
const _defaultInstruction = Object.freeze(instructions1[1]);

const InstructionReducer = (state = _defaultInstruction, action) => {
  switch(action.type) {
    case RECEIVE_INSTRUCTION:
      return action.instruction;
      break;
    case RECEIVE_LEVEL:
      return instructionDirectory[action.level.number][1];
    default:
      return state;
  }
};

export default InstructionReducer;
