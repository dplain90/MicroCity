import { level1 } from './level_1';
import { level2 } from './level_2';
import { level3 } from './level_3';
import { level4 } from './level_4';
export const levelDirectory = {
  1: level1,
  2: level2,
  3: level3,
  4: level4
};

export const calcSpace = (pos) => {
  let x = pos[0];
  let y = pos[1];

  return { x: x * 75, y: y * 75 };
}

export const positionItem = (pos) => {
 let {x, y} = pos;
 let midX = 75 / 2;
 let midY = 75 / 2;

 return { x: x - midX, y: y - midY }; 

}
