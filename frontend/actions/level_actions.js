import { levelDirectory } from '../data/levels/level_directory';

export const RECEIVE_LEVEL = "RECEIVE_LEVEL";
export const GET_LEVELS = "GET_LEVELS";
export const updateLevel = level => ({
  type: RECEIVE_LEVEL,
  level
});


export const getLevels = (difficulty) => ({
  type: GET_LEVELS,
  difficulty
});

export const levelCompleted = level => {
  newLevel = level + 1;
  if(levelDirectory[newLevel]) {
    return updateLevel(levelDirectory[newLevel]);
  }
};
