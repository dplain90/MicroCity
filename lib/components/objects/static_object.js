class StaticObject extends createjs.Bitmap {
  constructor(data){
    let { spriteSheet: img, objData } = data;
    let { x, y, scaleX, scaleY } = objData;
    super(img);
    this.x = x;
    this.y = y;
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    this.setupBounds = this.setupBounds.bind(this);
    this.mid = this.mid.bind(this);
    this.setupBounds();
  }

  setupBounds(){
    let bounds = this.getTransformedBounds();
    this.height = bounds.height;
    this.width = bounds.width;
  }

  mid(){
    return { x: this.x + (this.width / 2), y: this.y + (this.height / 2)};
  }

  remove(){
    this.stage.removeChild(this);
  }


}
export default createjs.promote(StaticObject, "Bitmap");
