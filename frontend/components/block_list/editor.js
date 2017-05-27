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
    this.code = new CodeTree(this.head);
    this.head.fn = () => { return [] };
    this.head.fnParams = [];
    this.panel = new EditorPanel(height, width, x);
    this.dropCallback = this.dropCallback.bind(this);
    this.findClosest = this.findClosest.bind(this);
    this.insertBlock = this.insertBlock.bind(this);
    this.recalibrate = this.recalibrate.bind(this);
    this.addLoopChildren = this.addLoopChildren.bind(this);
    this.resetChildren = this.resetChildren.bind(this);
    stage.addChild(this.panel);
    stage.on("stagemouseup", this.dropCallback);
  }

  addLoopChildren(loop){
    let callback = (evt) => {
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
    let block = blk.stage.activeBlock;

    blk.stage.activeBlock = null;

    let closestBlock = this.findClosest(x, y, block);

    if(this.panel.hitTest(localX, localY)) {
      this.recalibrate();
      this.insertBlock(closestBlock, block);
    } else {
      block.remove();
      // ParentCode.clearRelationship(block);
      this.stage.removeChild(block);
    }


    // this.resetChildren();
    if(block.onEditorCallback !== undefined && !block.editorCallbackComplete) {
      block.onEditorCallback();
      Object.assign(block.constructor.prototype, { editor: this });
    }

  }

  recalibrate(){
    let { x: panelX, width: panelW } = this.panel.getTransformedBounds();

    this.each(function() {
      Block.setY(this, 15);
      EditorPanel.alignBlock(this, panelW, panelX);
    });
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
    block.next = closestBlock.next;
    block.prev = closestBlock;
    closestBlock.next.prev = block;
    closestBlock.next = block;
      if(closestBlock === this.head){
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
