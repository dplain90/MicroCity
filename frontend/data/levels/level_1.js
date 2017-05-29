import { Blocks } from '../blocks/blocks';
export const level1 = {
  number: 1,
  completed: false,
  blockData: Blocks,
  levelData: {
    level: 1,
    objects: [
      {
        type: 'avatar',
        objData: { x: 0, y: 350, frame: 0, scaleX: 1, scaleY: 1, id: "avatar" }
      },
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
        type: 'key',
        objData: { x: 390, y: 30, scaleX: 0.7, scaleY: 0.7, id: "key" }
      }
    ],

    spriteSheets:
      [
        {
          "src": "frontend/data/sprites/avatar.json",
          "type": "spritesheet",
          "id": "avatar"
        },
        {
          "src": "images/objects/keyYellow.png",
          "type": "image",
          "id": "key" }

      ]
  }
};
