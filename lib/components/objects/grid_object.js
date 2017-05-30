class GridObject extends createjs.Sprite {
  constructor(spriteSheet, objData){
    super(spriteSheet);

    let { x, y, scaleX, scaleY, frame } = objData;

    this.x = x;
    this.y = y;
    this.scaleX = scaleX;
    this.scaleY = scaleY;

    if(frame) this.gotoAndStop(frame);
    this.mid = this.mid.bind(this);
    this.setupBounds = this.setupBounds.bind(this);
    this.setupBounds();
  }

  setupBounds(){
    let bounds = this.getTransformedBounds();
    this.height = bounds.height;
    this.width = bounds.width;
  }

  mid(){
    return { x: this.x + (this.width / 2), y: this.y + (this.height / 2)}
  }

}
export default createjs.promote(GridObject, "Sprite");
