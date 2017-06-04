import { Blocks } from '../../blocks/blocks';
export const level2 = {
  number: 2,
  completed: false,
  blockData: Blocks,
  levelData: {
    level: 2,
    objects: [
      {
        type: 'tile',
        objData: { x: 0, y: 325, width: 75, height: 75, num: 6, axis: 'x', id: "key"}
      },
      {
        type: 'tile',
        objData: { x: 0, y: 250, width: 75, height: 75, num: 6, axis: 'x', id: "key"}
      },
      {
        type: 'tile',
        objData: { x: 0, y: 175, width: 75, height: 75, num: 6, axis: 'x', id: "key"}
      },
      {
        type: 'tile',
        objData: { x: 150, y: 100, width: 75, height: 75, num: 2, axis: 'x', id: "key"}
      },
      {
        type: 'line',
        objData: {
          points: [
            {x: 0, y: 400},
            {x: 450, y: 400},
            {x: 450, y: 175},
            { x: 300, y: 175},
            {x: 300, y: 100},
            {x: 150, y: 100},
            {x: 150, y: 175},
            {x: 0, y: 175},
            {x: 0, y: 400}
          ]
        }
      },
      {
        type: 'key',
        objData: { x: 390, y: 350, scaleX: 0.7, scaleY: 0.7, id: "key" }
      },
      {
        type: 'evil',
        objData: { x: 250, y: 350, scaleX: 0.05, scaleY: 0.05, id: "evil" }
      },
      {
        type: 'evil',
        objData: { x: 175, y: 350, scaleX: 0.05, scaleY: 0.05, id: "evil" }
      },
      {
        type: 'evil',
        objData: { x: 175, y: 275, scaleX: 0.05, scaleY: 0.05, id: "evil" }
      },
      {
        type: 'evil',
        objData: { x: 250, y: 275, scaleX: 0.05, scaleY: 0.05, id: "evil" }
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
          "id": "key" },
        {
          "src": "assets/images/objects/virus.png",
          "type": "image",
          "id": "evil" }
      ]
  }
};
