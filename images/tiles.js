export const generateTileSheet = () => {
  let tileData = {
    images: [
    "./images/tiles.jpg"

  ],
    frames: [
      [21, 244, 73, 72],
      [217, 708, 73, 70],
      [414, 344, 71, 69],
      [122, 524, 76, 74]
    ]
}

  let tileSheet = new createjs.SpriteSheet(tileData);
  return tileSheet;
};
