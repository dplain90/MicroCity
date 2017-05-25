import BlockList from './block_list';
import EditorPanel from '../panel/editor_panel';

class Editor extends BlockList {
  constructor(stage, data){
    let { x, height, width } = data;
    super(stage);
    this.y = 0;
    this.panel = new EditorPanel(height, width, x);
    this.dropCallback = this.dropCallback.bind(this);
    this.findClosest = this.findClosest.bind(this);
    this.addBlock = this.addBlock.bind(this);
    stage.addChild(this.panel);
    stage.on("stagemouseup", this.dropCallback);
  }

  dropCallback(evt){
    let { stageX: x, stageY: y } = evt;
    let { x: localX, y: localY } = this.panel.globalToLocal(x, y);
    let block = stage.getObjectUnderPoint(x, y).parent;
    if(this.panel.hitTest(localX, localY)) {
      this.addBlock(this.findClosest(localX, localY), block);
    } else {
      debugger
      this.stage.removeChild(block);
    }
  }

  addBlock(closestBlock, newBlock){
    // if(typeof Block === closestBlock) {
    //   debugger
    //   this.append(newBlock);
    // } else {
      closestBlock.insert(newBlock);

  }

  findClosest(x, y) {
    let closest = this.first();
    this.each( () => {
      let currentDif = Math.abs(closest.mid.y - y);
      let newDif = Math.abs(this.y - y);
      if(newDif < currentDif) closest = this;
    });
    return closest;
  }

}


export default Editor;
