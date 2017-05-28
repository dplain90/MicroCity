import Tile from './tile';

class TileGroup extends createjs.SpriteContainer {
  constructor(data){
    super(data.spriteSheet);
    this.createTiles = this.createTiles.bind(this);

    this.createTiles(data.tiles);
  }

  createTiles(tiles){
    tiles.forEach((tileData) => {
      let newTile = new Tile(tileData);
      this.addChild(newTile);
    }, this);

  }


}
export default createjs.promote(TileGroup, "SpriteContainer");
