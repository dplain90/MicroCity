import Tile from './tile';

class TileGroup {
  constructor(data, stage){
    this.stage = stage;
    this.createTiles = this.createTiles.bind(this);
    this.createTiles(data);
  }

  createTiles(data){
    let { x, y, width, height, num, axis } = data.objData;
    const start_y = y;
    const start_x = x;
    for (let i = 0; i < num; i++) {
      if(axis === 'y') {
        y = start_y + (height * i);
        console.log(y);
      } else {
        x = start_x + (width * i);
      }
      let tile = new Tile(x, y, width, height);
      this.stage.addChild(tile);
      this.stage.update();
    }
  }


}
export default TileGroup;
