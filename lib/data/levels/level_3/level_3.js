import { blocks3 } from './blocks_3';
import { t, ct, et } from '../../blocks/blocks';

export const level3 = {
  number: 3,
  completed: false,
  blockData: blocks3,
  levelData: {
    level: 3,
    objects: [

      {
        type: 'tile',
        objData: { x: t(0), y: t(2), width: 75, height: 75, num: 6, axis: 'x', id: "key"}
      },
      {
        type: 'tile',
        objData: { x: t(0), y: t(3), width: 75, height: 75, num: 6, axis: 'x', id: "key"}
      },
      {
        type: 'tile',
        objData: { x: t(0), y: t(4), width: 75, height: 75, num: 6, axis: 'x', id: "key"}
      },
      {
        type: 'tile',
        objData: { x: t(0), y: t(5), width: 75, height: 75, num: 6, axis: 'x', id: "key"}
      },

      {
        type: 'line',
        objData: {
          points: [
            {x: t(0), y: t(2)},
            {x: et(5), y: t(2)},
            {x: et(5), y: et(5)},
            {x: t(0), y: et(5)}
          ]
        }
      },
      {
        type: 'key',
        objData: { x: t(3), y: t(4.2), scaleX: 0.9, scaleY: 0.9, id: "key" }
      },
      {
        type: 'evil',
        objData: { x: ct(2), y: ct(4), scaleX: 0.05, scaleY: 0.05, id: "evil" }
      },
      {
        type: 'evil',
        objData: { x: ct(2), y: ct(5), scaleX: 0.05, scaleY: 0.05, id: "evil" }
      },
      {
        type: 'evil',
        objData: { x: ct(2), y: ct(4), scaleX: 0.05, scaleY: 0.05, id: "evil" }
      },
      {
        type: 'evil',
        objData: { x: ct(2), y: ct(3), scaleX: 0.05, scaleY: 0.05, id: "evil" }
      },
      {
        type: 'avatar',
        objData: { x: t(0), y: ct(5), frame: 0, scaleX: 1.2, scaleY: 1.2, id: "avatar" }
      },
      {
        type: 'microchip',
        objData: { x: ct(0), y: ct(2), scaleX: 0.3, scaleY: 0.3, id: "microchip" }
      },
      {
        type: 'microchip',
        objData: { x: ct(3), y: ct(2), scaleX: 0.3, scaleY: 0.3, id: "microchip" }
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
