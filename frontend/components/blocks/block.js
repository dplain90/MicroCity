class Block extends createjs.Container {
  constructor(x = 0, y = 0, next = null, prev = null) {
    super();
    this.x = x;
    this.y = y;
    this.height = 0;
    this.next = next;
    this.prev = prev;
    this.mid = {x: 0, y: 0};
    this.remove = this.remove.bind(this);
    this.replace = this.replace.bind(this);
    this.dragCallback = this.dragCallback.bind(this);
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
    Block.centerLabel(bounds, label);
    Block.setMid(block, bounds);
    Block.setY(block, offset);
   }

  static setY(block, offset){
    let prev = block.prev;
    if(prev !== undefined) block.y = prev.y + (prev.height / 2) + offset;
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

  remove(){
    if(this.prev !== null) this.prev.next = this.next;
    if(this.next !== null) this.next.prev = this.prev;
    this.next = this.prev = null;
    return this;
  }

  replace(e){
    let replacement = Object.assign(Object.create(this), this, this.clone(true));

    replacement.prev.next = replacement;
    replacement.next.prev = replacement;

    this.stage.addChild(replacement);
    replacement.mouseChildren = false;
    replacement.on("mousedown", replacement.replace);
    replacement.on("pressmove", replacement.dragCallback);

    this.removeAllEventListeners("mousedown");
  }

  dragCallback(e){
    this.x = e.stageX - this.mid.x;
    this.y = e.stageY - this.mid.y;

    e.currentTarget.stage.update();
  }

}
export default createjs.promote(Block, "Container");
