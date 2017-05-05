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
      [406 ,48, 53, 37]
    ],
    animations: {
      idle: [0,1,2,3,4,5,6,7,8,9],
      run:[0,1,2,3,4,5,6,7,8,9]
    }
}

  let avatarSheet = new createjs.SpriteSheet(avatarData);
  return avatarSheet;
};
