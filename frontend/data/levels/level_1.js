import { avatarSpriteData } from './level_1';

export const level1 = {

  level: 1,

  objects: [
    {
      type: 'avatar',
      objData: { x: 0, y: 0, frame: 0, scaleX: 1, scaleY: 1, id: "avatar" }
    },
    {
      type: 'avatar',
      objData: { x: 30, y: 0, frame: 0, scaleX: 0.8, scaleY: 0.8, id: "avatar2" }
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
        "id": "avatar2" }
    ]

};
