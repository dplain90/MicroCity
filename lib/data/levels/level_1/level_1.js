import { Blocks } from '../../blocks/blocks';

export const level1 = {
  number: 1,
  completed: false,
  blockData: Blocks,
  levelData: {
    level: 1,
    objects: [
      {
        type: 'tile',
        objData: { x: 0, y: 325, width: 75, height: 75, num: 4, axis: 'x', id: "key"}
      },
      {
        type: 'tile',
        objData: { x: 225, y: 25, width: 75, height: 75, num: 4, axis: 'y', id: "key"}
      },
      {
        type: 'tile',
        objData: { x: 300, y: 25, width: 75, height: 75, num: 2, axis: 'x', id: "key"}
      },
      {
        type: 'line',
        objData: { points: [{x: 0, y: 400}, {x: 300, y: 400}, {x: 300, y: 100}, {x: 450, y: 100}, {x: 450, y: 25}, { x: 225, y: 25}, {x: 225, y: 325}, {x: 0, y: 325}]}
      },
      {
        type: 'key',
        objData: { x: 390, y: 30, scaleX: 0.7, scaleY: 0.7, id: "key" }
      },
      {
        type: 'avatar',
        objData: { x: 0, y: 350, frame: 0, scaleX: 1.2, scaleY: 1.2, id: "avatar" }
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
          "src": "assets/images/objects/keyYellow.png",
          "type": "image",
          "id": "key" }

      ]
  }
};
