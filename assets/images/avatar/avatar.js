export const generateAvatar = () => {
  let avatarData = {
    images: [
    "./images/avatar/robot2.gif"
  ],
    frames: [
      [3, 48, 45, 37],
      [49, 48, 49, 37],
      [100, 48, 37, 37],
      [139, 48, 42, 37],
      [183, 48, 47, 37],
      [227,48, 47 , 37],
      [274 ,48, 44 , 37],
      [318, 48, 41, 37],
      [359,48, 47 , 37],
      [406 ,48, 53, 37],
      [210,1, 41, 37],
      [251, 1, 39, 37],
      [290, 1, 41, 37],
      [51, 203, 41, 47],
      [92, 203 ,45 , 47],
      [137,  203, 44,  47],
      [181, 203 ,46 , 47],
      [227,  203, 50,  47],
      [277, 203 ,34 ,47]

    ],
    animations: {
      idle: [10, 12],
      move:[0, 9],
      jump: [16]
    }
}

  let avatarSheet = new createjs.SpriteSheet(avatarData);
  return avatarSheet;
};