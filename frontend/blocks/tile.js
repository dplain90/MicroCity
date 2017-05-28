import SpriteObject from "./sprite_object";

class Tile extends SpriteObject {
  constructor(data){
    let { spriteSheet, objData } = data;
    super(spriteSheet, objData);
    let { rotation } = objData;
    this.regX = (this.width / 2);
    this.regY = (this.height / 2);
    this.rotation = rotation;
    this.touching = this.touching.bind(this);
    this.setupBounds();
    let bounds = this.getTransformedBounds();
    this.hitArea = new createjs.Shape();
    
    this.hitArea.graphics.setStrokeStyle(1).beginStroke("white").beginFill("white").drawRect(bounds.x, bounds.y, bounds.width, bounds.height);



  }

  touching(obj){
    let {x: xRotate, y: yRotate} = this.getTransformedBounds();
    let tilePt = new createjs.Point(xRotate, yRotate);
    // let { x, y} = tilePt.localToLocal(0, 0, obj);
    this.hitTest(obj.x, obj.y);
    debugger
    return Math.abs(x) <= this.width && Math.abs(y) <= this.height;
  }

}

export default Tile;
