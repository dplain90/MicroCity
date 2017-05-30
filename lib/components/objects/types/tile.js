class Tile extends createjs.Container {
  constructor(x, y, height, width){
    super();
    this.touching = this.touching.bind(this);
    this.create = this.create.bind(this);
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.tile = this.create();
    this.alpha = 0.3;
    this.addChild(this.tile);
    this.hitArea = this.create();

  }

  create(){
    let block = new createjs.Shape();
    block.graphics
      .f("white")
      .setStrokeStyle(2)
      .beginStroke("black")
      .dr(0, 0, this.width, this.height);
    return block;
  }

  touching(obj){
    let {x: xRotate, y: yRotate} = this.getTransformedBounds();
    let tilePt = new createjs.Point(xRotate, yRotate);
    // let { x, y} = tilePt.localToLocal(0, 0, obj);
    this.hitTest(obj.x, obj.y);
    return Math.abs(x) <= this.width && Math.abs(y) <= this.height;
  }

}

export default createjs.promote(Tile, "Container");
