class Block extends createjs.Container {
  constructor(x = 0, y = 0) {
    super();
    this.x = x;
    this.y = y;
    this.next = this.prev = null;
    this.img = new Image();
  }

  static setup(block) {
    let { name, font, color, scaleX, scaleY } = block.data;
    let imgBlk = new createjs.Bitmap(block.img).set({scaleX, scaleY});
    let label = new createjs.Text(name.toUpperCase(), font, color);
    block.addChild(imgBlk, label);
    let { x, y, height, width } = block.getTransformedBounds();
    label.textAlign = 'center';
    label.textBaseline = 'middle';
    label.x = width / 2;
    label.y = height / 2;
    debugger
   }

  findMid(bounds) {
    let { x, y, height, width } = bounds;
    const midY = y + (height / 2);
    const midX = x + (width / 2);
    return {x: midX, y: midY};
  }

  remove(){
    if(this.prev !== null) this.prev.next = this.next;
    if(this.next !== null) this.next.prev = this.prev;
    this.next = this.prev = null;
    return this;
  }

  dragCallback(e){
    this.x = e.stageX
    this.y = e.stageY
    this.stage.update();
  }
}
export default createjs.promote(Block, "Container");
