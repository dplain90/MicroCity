import ParentCode from '../code/parent_code';
class Block extends createjs.Container {
  constructor(x = 0, y = 0, next = null, prev = null, codeChildren = new Set()) {
    super();
    this.x = x;
    this.y = y;
    this.height = 0;
    this.next = next;
    this.prev = prev;
    this.mid = {x: 0, y: 0};
    this.remove = this.remove.bind(this);
    this.dragCallback = this.dragCallback.bind(this);
    this.isLast = this.isLast.bind(this);
    this.removeLink = this.removeLink.bind(this);
    this.getMid = this.getMid.bind(this);
    this.codeChildren = codeChildren;
    this.mouseChildren = false;
  }

  static setup(block) {
    let { name, font, color, scaleX, scaleY, offset } = block.data;
    let imgBlk = new createjs.Bitmap(block.img).set({scaleX, scaleY});
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
    stage.activeBlock = e.currentTarget;
    stage.update();
  }

}
export default createjs.promote(Block, "Container");
