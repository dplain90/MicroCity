import { Blocks } from '../blocks/blocks';
export const level4 = {
  number: 4,
  completed: false,
  blockData: Blocks,
  levelData: {
    level: 4,
    objects: [
      {
        type: 'avatar',
        objData: { x: 0, y: 0, frame: 0, scaleX: 1, scaleY: 1, id: "avatar" }
      },
      {
        type: 'avatar',
        objData: { x: 30, y: 0, frame: 0, scaleX: 0.8, scaleY: 0.8, id: "avatar2" }
      },
      {
        type: 'tile',
        objData: { x: 60, y: 60, frame: 0, scaleX: 0.8, scaleY: 0.8, id: "tile", rotation: 90 }
      },
      {
        type: 'key',
        objData: { x: 200, y: 0, scaleX: 0.7, scaleY: 0.7, id: "key" }
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
          "src": "frontend/data/sprites/avatar.json",
          "type": "spritesheet",
          "id": "avatar2" },
        {
          "src": "frontend/data/objects/tile.json",
          "type": "spritesheet",
          "id": "tile" },
        {
          "src": "images/objects/keyYellow.png",
          "type": "image",
          "id": "key" }
      ]
  }
};
