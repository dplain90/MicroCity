import BlockList from './block_list';
import EditorPanel from '../panel/editor_panel';
import Block from '../blocks/block';

class Editor extends BlockList {
  constructor(stage, data){
    let { x, height, width } = data;
    super(stage);
    this.y = 0;
    this.panel = new EditorPanel(height, width, x);
    this.dropCallback = this.dropCallback.bind(this);
    this.findClosest = this.findClosest.bind(this);
    this.insertBlock = this.insertBlock.bind(this);
    this.recalibrate = this.recalibrate.bind(this);
    stage.addChild(this.panel);
    stage.on("stagemouseup", this.dropCallback);
  }

  dropCallback(evt){
    let { stageX: x, stageY: y, currentTarget: blk } = evt;
    let { x: localX, y: localY } = this.panel.globalToLocal(x, y);
    let block;
    if(blk === stage){
      block = blk.getObjectUnderPoint(x,y).parent;
    } else {
      block = blk.stage.getObjectUnderPoint(x, y).parent;
    }


    let closestBlock = this.findClosest(x, y, block);

    if(this.panel.hitTest(localX, localY)) {
      this.recalibrate();
      this.insertBlock(closestBlock, block);
    } else {
      block.remove();
      this.stage.removeChild(block);
    }

    this.recalibrate();
  }

  recalibrate(){
    let { x: panelX, width: panelW } = this.panel.getTransformedBounds();

    this.each(function() {
      console.log(this);
      console.log(this.y);
      Block.setY(this, 15);
      console.log(this.y);
      EditorPanel.alignBlock(this, panelW, panelX);
    });
  }

  insertBlock(closestBlock, block){
    if(closestBlock === this.tail){
      closestBlock.prev.next = block;
      block.prev = closestBlock.prev;
      closestBlock.prev = block;
      block.next = closestBlock;
    } else {
      block.next = closestBlock.next;
      block.prev = closestBlock;
      closestBlock.next.prev = block;
      closestBlock.next = block;
    }
  }

  findClosest(x, y, block) {
    let closest = this.head.next;
    if(this.includes(block)) {
      closest = block.prev;
      block.remove();
    }

    this.each( function() {
      let { x: blockX, y: blockY } = this.localToGlobal(0, this.y);
      let { x: closestX, y: closestY } = closest.localToGlobal(0, closest.y);
      let currentDif = Math.abs(closestY - y);
      let newDif = Math.abs(blockY - y);
      if(newDif < currentDif && this !== block) closest = this;
    });
    return closest;
  }

}


export default Editor;
