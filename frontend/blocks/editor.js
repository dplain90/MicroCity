import { BlockSet, Block } from './block';
import Code from './code';
class Editor {
  constructor(code, stage) {
    this.editor = new createjs.Container();
    this.stage = stage;
    this.code = code;
    this.loops = [];
    this.set = new BlockSet({
      category: '',
      y_increment: 20,
      start_pos: { x: 110, y: 0 },
      code: this.code,
      parent: this.editor
    });
    this.code.blocks = this.set
    this.onEditor = this.onEditor.bind(this);
    this.addBlock = this.addBlock.bind(this);
    this.hasChild = this.hasChild.bind(this);
    this.addEditorBox = this.addEditorBox.bind(this);
    this.dragCallback = this.dragCallback.bind(this);
    this.droppedCallback = this.droppedCallback.bind(this);
    this.listeners = [
          { type: "pressmove", callback: this.dragCallback },
          { type: "pressup", callback: this.droppedCallback }
        ];

    this.addEditorBox();
    this.stage.addChild(this.editor);
    this.stage.update();
  }

  between(loc, minParam, maxParam){
    return loc <= maxParam && loc >= minParam;
  }

  onEditor(blk) {
    let distToEditor = this.editor.localToLocal(13, -blk.offSet, blk);
    return distToEditor.x <= 1.5 && distToEditor.y <= 0 && distToEditor.y >= -292;
  }

  hasChild(blk){
    return this.editor.contains(blk);
  }

  dragCallback(e) {
    e.currentTarget.x = e.stageX - 150;
    e.currentTarget.y = e.stageY - 30 - e.currentTarget.offSet;

    console.log(this.editor.localToLocal(13, 0, e.currentTarget));
    this.stage.update();
  }

  checkForLoop(obj, newBlk){
    for (var i = 0; i < this.loops.length; i++) {

      let loop = this.loops[i];
      let container = loop.container.getBounds();

      if(obj.y + obj.offSet >= container.y && obj.y - obj.offSet <= container.y + container.height && newBlk.block_id !== loop.block_id) {
        loop.addCallback(newBlk.container);

        newBlk.container.x = newBlk.originX = loop.container.x + 45;
        newBlk.container.y = newBlk.originY = loop.container.y + (loop.callback.length * 20);

      }
    }
  }

  addBlock(fnName) {
    let newBlk = this.set.addBlock(fnName);
    newBlk.block_id = newBlk.container.id;
    if(newBlk.type === 'loop') this.loops.push(newBlk);
    this.stage.update();
    return newBlk;
  }

  removeBlock(blk) {
    Block.turnOffListeners(blk, ["mouseup", "pressmove", "mousedown"]);
    if(this.editor.contains(blk)) this.set.removeBlock(blk.parentBlock);
    this.stage.removeChild(blk);
    this.stage.update();
  }

  addEditorBox() {
    const editorBox = new createjs.Shape();
    editorBox.graphics.beginStroke("white").beginFill("#C2C0C0").drawRect(200, 5, 300, 290);
    this.editor.addChild(editorBox);
    this.editor.setBounds(100, -50, 300, 290);
  }

  droppedCallback(e){
    const blk = e.currentTarget;
    if(this.onEditor(blk)) {
      if(!this.hasChild(blk)){
        const newBlk = this.addBlock(blk.fnName);
        this.checkForLoop(blk, newBlk);
        newBlk.addListeners(this.listeners);
      } else {
        blk.x = blk.originX;
        blk.y = blk.originY;
        return;
      }
    }
    this.removeBlock(blk);
  }
}

export default Editor;
