import { blocks1 } from './blocks_1';
import { t, ct, et } from '../../blocks/blocks';
export const level1 = {
  number: 1,
  completed: false,
  blockData: blocks1,
  levelData: {
    level: 1,
    objects: [
      {
        type: 'tile',
        objData: { x: t(0), y: t(1), width: 75, height: 75, num: 3, axis: 'x', id: "key"}
      },
      {
        type: 'line',
        objData: { points: [{x: t(0), y: t(1)}, {x: t(3), y: t(1)}, {x: t(3), y: t(2)}, {x: t(0), y: t(2)}]}
      },
      {
        type: 'key',
        objData: { x: t(2), y: ct(1), scaleX: 0.7, scaleY: 0.7, id: "key" }
      },
      {
        type: 'avatar',
        objData: { x: ct(0), y: ct(1), frame: 0, scaleX: 1, scaleY: 1, id: "avatar" }
      },
      {
        type: 'microchip',
        objData: { x: ct(1), y: ct(1), scaleX: 0.3, scaleY: 0.3, id: "microchip" }
      }
    ],

    spriteSheets:
      [
        {
          "src": "lib/data/sprites/avatar.json",
          "type": "spritesheet",
          "id": "avatar"
        },
        {
          "src": "lib/data/sprites/gate.json",
          "type": "spritesheet",
          "id": "key" },
        {
          "src": "assets/images/objects/microchip_final.png",
          "type": "image",
          "id": "microchip" }

      ]
  }
};
