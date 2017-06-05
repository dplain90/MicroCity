import { blocks2 } from './blocks_2';
import { t, ct, et } from '../../blocks/blocks';

export const level2 = {
  number: 2,
  completed: false,
  blockData: blocks2,
  levelData: {
    level: 2,
    objects: [

      {
        type: 'tile',
        objData: { x: t(0), y: t(3), width: 75, height: 75, num: 4, axis: 'x', id: "key"}
      },
      {
        type: 'tile',
        objData: { x: t(0), y: t(4), width: 75, height: 75, num: 4, axis: 'x', id: "key"}
      },

      {
        type: 'line',
        objData: {
          points: [
            {x: t(0), y: t(5)},
            {x: et(3), y: t(5)},
            {x: et(3), y: t(3)},
            {x: t(0), y: t(3)}
          ]
        }
      },
      {
        type: 'key',
        objData: { x: ct(3), y: ct(4), scaleX: 0.7, scaleY: 0.7, id: "key" }
      },
      {
        type: 'evil',
        objData: { x: ct(2), y: ct(4), scaleX: 0.05, scaleY: 0.05, id: "evil" }
      },
      {
        type: 'evil',
        objData: { x: ct(1), y: ct(4), scaleX: 0.05, scaleY: 0.05, id: "evil" }
      },
      {
        type: 'avatar',
        objData: { x: t(0), y: ct(4), frame: 0, scaleX: 1.2, scaleY: 1.2, id: "avatar" }
      },
      {
        type: 'microchip',
        objData: { x: ct(2), y: ct(3), scaleX: 0.3, scaleY: 0.3, id: "microchip" }
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
          "src": "assets/images/objects/virus.png",
          "type": "image",
          "id": "evil" },
          {
            "src": "assets/images/objects/microchip_final.png",
            "type": "image",
            "id": "microchip" }
      ]
  }
};
