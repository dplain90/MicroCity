import ParentCode from '../code/parent_code';
class Block extends createjs.Container {
  constructor(x = 0, y = 0, next = null, prev = null, codeChildren = new Set()) {
    super();
    this.x = x;
    this.y = y;
    this.height = 0;
    this.next = next;
    this.prev = prev;
    this.hover = 0;
    this.mid = {x: 0, y: 0};
    this.remove = this.remove.bind(this);
    this.dragCallback = this.dragCallback.bind(this);
    this.isLast = this.isLast.bind(this);
    this.removeLink = this.removeLink.bind(this);
    this.getMid = this.getMid.bind(this);
    this.farX = this.farX.bind(this);
    this.calcHover = this.calcHover.bind(this);
    this.intersects = this.intersects.bind(this);
    this.farY = this.farY.bind(this);
    this.codeChildren = codeChildren;
    this.mouseChildren = false;
  }

  static setup(block) {
    let { name, font, color, scaleX, scaleY, offset } = block.data;
    let imgBlk = new createjs.Bitmap(block.img).set({scaleX, scaleY});
    block.imgBlk = imgBlk;
    let label = new createjs.Text(name.toUpperCase(), font, color);
    label.mouseEnabled = false;
    block.addChild(imgBlk, label);
    let bounds = block.getTransformedBounds();
    block.height = bounds.height;
    block.width = bounds.width;
    Block.centerLabel(bounds, label);
    Block.setMid(block, bounds);
    Block.setY(block, offset);
   }

  static setY(block, offset){
    let prev = block.prev;
    if(prev !== undefined) block.y = prev.y + prev.height;
    return block;
  }

  static centerLabel(bounds, label){
    let { width, height } = bounds;
    label.textAlign = 'center';
    label.textBaseline = 'middle';
    label.x = width / 2;
    label.y = height / 2;
  }

  static setMid(block, bounds) {
    let { x, y, height, width } = bounds;
    const midY = height / 2;
    const midX = width / 2;
    block.mid = {x: midX, y: midY};
  }



  getMid(){
    let x = this.x + this.mid.x;
    let y = this.y + this.mid.y;
    return {x, y};
  }

  remove(){
    this.removeLink();
    ParentCode.removeChild(this);
    return this;
  }

  removeLink(){
    if(typeof Block !== this.prev ) this.prev.next = this.next;
    if(typeof Block !== this.next ) this.next.prev = this.prev;
  }

  isLast(){
    return this.next.next === null;
  }

  calcHover(block){
    let y = this.y + this.hovered;
    if(this.y > block.y) {
      return 5;
    } else {
      return -5;
    }
  }
  intersects(block){

    // let onX = this.onAxis(this.farX(), block.farX(), this.width);
    let onX = (block.x + (block.width/2)) <= this.farX() && (block.x + (block.width/2)) >= this.x;


    let onY = this.onAxis(this.farY(), block.y + (block.height/2), this.height);
    return onX && onY;
  }

  onAxis(ownFar, far, size){

    let diff = far - ownFar;

    return Math.abs(diff) < size;

  }

  farY(){
    return this.y + (this.height / 2);
  }

  farX(){
    return this.x + this.width;
  }

  static isClosest(block, y){
    let currentDif = block.getMid().y - y;

    if(currentDif < 0) {
       if(block.isLast()) return block;
       return false;
     } else {
       return block.prev;
    }
  }

  dragCallback(e){
    this.x = e.stageX - this.mid.x;
    this.y = e.stageY - this.mid.y;
    let stage = e.currentTarget.stage;
    // stage.testBlock = e.currentTarget;

    stage.activeBlock['current'] = e.currentTarget;

    stage.update();
  }

}
export default createjs.promote(Block, "Container");
