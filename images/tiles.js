

class Tile {
  constructor(){

  }

  static create(x, y){
    const tileData = {
      images: [ "./images/tiles.jpg"],
      frames: [
        [21, 244, 73, 72],
        [217, 708, 73, 70],
        [414, 344, 71, 69],
        [122, 524, 76, 74]
      ]
    };

    let tileSheet = new createjs.SpriteSheet(tileData);
    let tile = new createjs.Sprite(tileSheet);

    tile.scaleX = .25;
    tile.scaleY = .25;
    tile.x = x;
    tile.y = y;
    return tile;
  }
}


// const generateTileSheet = () => {
//   let tileData = {
//     images: [
//     "./images/tiles.jpg"
//
//   ],
//     frames: [
//       [21, 244, 73, 72],
//       [217, 708, 73, 70],
//       [414, 344, 71, 69],
//       [122, 524, 76, 74]
//     ]
// }
//
//   let tileSheet = new createjs.SpriteSheet(tileData);
//   return tileSheet;
// };

export default Tile;
