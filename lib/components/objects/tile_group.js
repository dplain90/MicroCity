import Tile from './types/tile';

class TileGroup {
  constructor(data, stage){
    this.stage = stage;
    this.createTiles = this.createTiles.bind(this);
    this.createTiles(data);
  }

  createLine(x,y, endX, endY){
    let line = new createjs.Shape();
    line.graphics.f().beginLinearGradientStroke(["#0cebeb","#29ffc6"], [0, 0.8], 0, 0, 300, 300).ss(2, "round", "round").moveTo(x,y).lineTo(endX, endY);
    return line;
  }
  createTiles(data){

    let { x, y, width, height, num, axis } = data.objData;
    const start_y = y;
    const start_x = x;
    // if(axis === 'y') {
    //   let closeLine = this.createLine(start_x - 2, start_y, start_x - 2, start_y + (height * (num-1)));
    //   let farLine = this.createLine(start_x + width + 2, start_y, start_x + width + 2, start_y + (height * num));
    //   this.stage.addChild(closeLine, farLine);
    // } else {
    //   let closeLine = this.createLine(start_x, start_y - 2, start_x + (width * (num-1)), start_y - 2);
    //   let farLine = this.createLine(start_x, start_y + height + 2, start_x + (width * (num - 1)), start_y + height + 2);
    //   this.stage.addChild(closeLine, farLine);
    // }


    for (let i = 0; i < num; i++) {
      if(axis === 'y') {
        y = start_y + (height * i);

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
