import BlockList from './block_list';
import EditorPanel from '../panel/editor_panel';
import Block from '../blocks/block';
import CodeTree from '../code/code_tree';
import ParentCode from '../code/parent_code';
import ParentNode from '../blocks/parent_node';
class Editor extends BlockList {
  constructor(stage, data){
    let { x, height, width } = data;
    super(stage);
    this.y = 0;
    this.head.fn = () => { return [] };
    this.head.fnParams = [];
    this.panel = new EditorPanel(height, width, x);
    this.dropCallback = this.dropCallback.bind(this);
    this.findClosest = this.findClosest.bind(this);
    this.insertBlock = this.insertBlock.bind(this);
    this.recalibrate = this.recalibrate.bind(this);
    this.addLoopChildren = this.addLoopChildren.bind(this);

    this.turnOnHover = this.turnOnHover.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.clearBlocks = this.clearBlocks.bind(this);

    stage.addChild(this.panel);
    stage.on("stagemouseup", this.dropCallback);
    let turnOnHover = this.turnOnHover;
    stage.activeBlock = new Proxy({ current: null}, {
        set: function(target, property, value, receiver) {
          target[property] = value;
          turnOnHover(value);
          return true;
        }
      });
    this.code = new CodeTree(this.head);
    window.code = this.code;
  }

  handleHover(block) {
    return (e) => {
      let current = block;
      this.each(function() {

        if(this.intersects(current)){
          let newHover = this.calcHover(current);
          if(this.hover === 0){
            this.hover = newHover;
            this.y += this.hover;
          } else {
            if(this.hover !== newHover) {
              this.y += (newHover * 2);
              this.hover = newHover;
            }
          }

        } else {
          if(this.hover !== 0) {
             this.y += this.hover * -1;
             this.hover = 0;
          }
        }
      });
    };
  }

  turnOnHover(value) {
    if(value === null){
      this.stage.removeAllEventListeners("stagemousemove");
    } else {
      if(!this.stage.hasEventListener("stagemousemove")) {
        this.stage.on("stagemousemove", this.handleHover(value));
      }
    }
  }

  clearBlocks(){
    while(this.head.next !== this.tail){
      let block = this.head.next
      block.remove();
      this.stage.removeChild(block);
      this.recalibrate();
    }
  }

  addLoopChildren(loop){
    let callback = (evt) => {
      loop.closed = true;
      let stage = this.stage;
      loop.removeAllEventListeners();
      stage.removeAllEventListeners();
      let { stageX: x, stageY: y } = evt;
      let blk = loop.next
      let blkEnd;
      while(blk !== this.tail){
        blkEnd = blk.y + blk.height;
        if(blkEnd >= y) break;
        blk.changeParent(loop);
        blk = blk.next;
      }

      loop.completeConnection();
      stage.update();
      loop.turnOnListeners();
      stage.on("stagemouseup", this.dropCallback);
    };

    return callback.bind(this);
  }


  dropCallback(evt){
    let { stageX: x, stageY: y, currentTarget: blk } = evt;
    let { x: localX, y: localY } = this.panel.globalToLocal(x, y);
    let block = blk.stage.activeBlock['current'];
    if(!block) return;
    blk.stage.activeBlock['current'] = null;
    if(block.inputField !== undefined) block.inputField.unhide();

    let closestBlock = this.findClosest(x, y, block);

    if(this.panel.hitTest(localX, localY)) {
      this.insertBlock(closestBlock, block);
      this.recalibrate();
    } else {
      block.remove();
      this.stage.removeChild(block);
      this.recalibrate();
    }

    if(block.onEditorCallback && !block.editorCallbackComplete) {
      block.onEditorCallback();
      Object.assign(block.constructor.prototype, { editor: this });
      this.recalibrate();
    }
  }

  recalibrate(){
    let editor = this;
    this.each(function() {
      this.hover = 0;
      Block.setY(this, 15, editor.getIdx(this));
      let parent = this.parentNode;
      if(parent && parent.lastNode() === this && !parent.isHead()) {
        parent.completeConnection();
      }
      this.stage.update();
    });
  }


  insertBlock(closestBlock, block){
    let { x: panelX, width: panelW } = this.panel.getTransformedBounds();
    EditorPanel.alignBlock(block, panelW, panelX);

    block.next = closestBlock.next;
    block.prev = closestBlock;
    closestBlock.next.prev = block;
    closestBlock.next = block;

    block.findParent();
  }

  findClosest(x, y, block) {
    let head = this.head
    let closest = head;

    if(this.includes(block)) block.removeLink();

    this.each( function() {
      if(closest === head) {
        let result = Block.isClosest(this, y);
        if(result) closest = result;
      }
    });
    return closest;
  }
}


export default Editor;
