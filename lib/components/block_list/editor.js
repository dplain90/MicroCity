import BlockList from './block_list';
import EditorPanel from '../panel/editor_panel';
import Block from '../blocks/block';
import CodeTree from '../code/code_tree';
import ParentCode from '../code/parent_code';

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
    this.resetChildren = this.resetChildren.bind(this);
    this.turnOnHover = this.turnOnHover.bind(this);
    this.handleHover = this.handleHover.bind(this);
    // stage.testBlock = { val: null };
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


  addLoopChildren(loop){
    let callback = (evt) => {
      loop.closed = true;
      let stage = this.stage;
      loop.removeAllEventListeners();
      stage.removeAllEventListeners();
      let { stageX: x, stageY: y } = evt;
      let blk = loop.next
      let blkEnd = blk.y + blk.height;
      while(blk !== this.tail){
        if(blk.codeParent === null) {
          ParentCode.addChild(loop, blk);
        } else {
          ParentCode.changeParent(blk.codeParent, loop, blk);
        }
        if(blkEnd >= y) break;
        blk = blk.next;
        blkEnd = blk.y + blk.height;
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

    blk.stage.activeBlock['current'] = null;
    if(block.inputField !== undefined){
      block.inputField.unhide();
    }
    let closestBlock = this.findClosest(x, y, block);

    if(this.panel.hitTest(localX, localY)) {
      this.recalibrate();
      this.insertBlock(closestBlock, block);

    } else {
      block.remove();
      this.stage.removeChild(block);
      this.recalibrate();
    }


    // this.resetChildren();
    if(block.onEditorCallback !== undefined && !block.editorCallbackComplete) {
      block.onEditorCallback();
      Object.assign(block.constructor.prototype, { editor: this });
      this.recalibrate();
    }

  }

  recalibrate(){
    let { x: panelX, width: panelW } = this.panel.getTransformedBounds();
    let editor = this;
    this.each(function() {
      let parent = this.codeParent;
      this.hover = 0;
      Block.setY(this, 15, editor.getIdx(this));
      if(ParentCode.isParent(parent) && parent !== editor.head) {
        parent.completeConnection();
      }
    });

    this.stage.update();
  }

  resetChildren(){

    ParentCode.clearChildren(this.code.root);
    let rootNode = this.head;
    this.each(function(){
      let parent = this.codeParent;
      if(parent === undefined || parent === rootNode){
        ParentCode.addChild(rootNode, this);
      }
    });
  }

  insertBlock(closestBlock, block){
    let { x: panelX, width: panelW } = this.panel.getTransformedBounds();
    EditorPanel.alignBlock(block, panelW, panelX);

    block.next = closestBlock.next;
    block.prev = closestBlock;
    closestBlock.next.prev = block;
    closestBlock.next = block;
      if(closestBlock === this.head || ParentCode.lastChild(closestBlock.codeParent) === closestBlock ){
        ParentCode.addChild(this.head, block);
        this.recalibrate();
      } else {
        this.recalibrate();
        ParentCode.insertChild(closestBlock, block);
      }

      if(block.codeParent !== this.head) { block.codeParent.completeConnection();
      }
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
