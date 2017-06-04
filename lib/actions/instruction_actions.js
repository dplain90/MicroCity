
import { instructionDirectory } from '../data/levels/instruction_directory';

export const RECEIVE_INSTRUCTION = "RECEIVE_INSTRUCTION";
export const GET_INSTRUCTION = "GET_INSTRUCTION";

export const updateInstruction = instruction => ({
  type: RECEIVE_INSTRUCTION,
  instruction
});


export const getInstruction = (levelNum, stepNum) => {
  return instructionDirectory[levelNum][stepNum];
};
