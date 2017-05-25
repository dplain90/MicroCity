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
    stage.addChild(this.panel);
    stage.on("stagemouseup", this.dropCallback);
  }

  dropCallback(evt){
    let { stageX: x, stageY: y } = evt;
    let { x: localX, y: localY } = this.panel.globalToLocal(x, y);
    let { width: panelWidth, x: panelX } = this.panel.getTransformedBounds();
    let block = evt.currentTarget.stage.getObjectUnderPoint(x, y).parent;

    if(this.panel.hitTest(localX, localY)) {
      EditorPanel.alignBlock(block, panelWidth, panelX);
      // if(this.includes(block)) this.findClosest(localX, localY)
      // insert code to calculate what to do if the block is already on the editor.

      let closestBlock = this.findClosest(x, y);

      this.insertBlock(closestBlock, block);
      this.each(function() {
        console.log(this.data);
        Block.setY(this, 15);
        EditorPanel.alignBlock(this, panelWidth, panelX);
      });
    } else {
      this.stage.removeChild(block);
    }
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

  findClosest(x, y) {
    let closest = this.head.next;
    this.each( function() {
      let { x: blockX, y: blockY } = this.localToGlobal(0, this.y);
      let { x: closestX, y: closestY } = closest.localToGlobal(0, closest.y);
      let currentDif = Math.abs(closestY - y);
      let newDif = Math.abs(blockY - y);
      if(newDif < currentDif) closest = this;
    });
    return closest;
  }

}


export default Editor;
