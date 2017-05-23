import { BlockSet, Block } from './block';
import Code from './code';
class Editor {
  constructor(code, stage) {
    this.editor = new createjs.Container();
    this.stage = stage;
    this.addArrow = this.addArrow.bind(this);
    this.code = code;
    this.loops = [];
    this.set = new BlockSet({
      category: '',
      y_increment: 20,
      start_pos: { x: 110, y: -15 },
      code: this.code,
      parent: this.editor
    });
    this.code.blocks = this.set
    this.onEditor = this.onEditor.bind(this);
    this.addBlock = this.addBlock.bind(this);
    this.drawArrow = this.drawArrow.bind(this);
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
    this.stage.update();
  }

  checkForLoop(blk){
    debugger
    if(blk.parentBlock.type === 'numerator') {
      let editorBlocks = this.set.toArray();
      let idx = 0;
      let closestBlock = editorBlocks[idx];
      while(closestBlock.y < blk.y && idx < editorBlocks.length) idx+=1;
      closestBlock.addNumerator(blk.parentBlock);
    } else {
      const newBlk = this.addBlock(blk.fnName);
      newBlk.addListeners(this.listeners);
    }
  }

  addArrow(x, y, stage) {
    this.arrow = new createjs.Shape();
    this.arrowHead = new createjs.Shape();

    stage.addChild(this.arrow, this.arrowHead);
    return (e) => {
      this.arrow.graphics.clear();
      this.arrowHead.graphics.clear();
      this.arrow.graphics.beginStroke("black").moveTo(x, y).bezierCurveTo(x + 60, y + ((e.stageY - y) / 3), x + 40, y + ((e.stageY - y) / 2), e.stageX + 10, e.stageY - 10);

      let yDiff = (e.stageY - 10) - (y + ((e.stageY - y) / 3));
      let xDiff = (e.stageX + 10) - (x + 40);
      let direction = Math.atan2(yDiff, xDiff) / Math.PI * 180;

      this.arrowHead.graphics.beginFill("black").dp(e.stageX + 10 , e.stageY - 10, 8, 3);
      this.arrowHead.regX = e.stageX + 10;
      this.arrowHead.regY = e.stageY - 10;
       this.arrowHead.rotation = direction;
      this.arrowHead.x = e.stageX + 10;
      this.arrowHead.y = e.stageY - 10;

      stage.update();
    };
  }

  drawArrow(e){
    e.currentTarget.removeAllEventListeners();
    let callback = this.addArrow(e.currentTarget.x + 170, e.currentTarget.y + 28 + e.currentTarget.offSet, this.stage);
     this.stage.enableMouseOver(10);
  let arrowListener = this.stage.on("stagemousemove", callback);

    let stage = this.stage;
    let set = this.set;
    this.stage.on("stagemouseup", (evt) => {
      let endPos = { x: evt.stageX, y: evt.stageY }
      e.currentTarget.parentBlock.addCallbacks(endPos, set);

      stage.removeAllEventListeners();
      this.arrow.graphics.clear();
      this.arrowHead.graphics.clear();
      stage.update();
      e.currentTarget.addEventListener("pressmove", this.dragCallback);
      e.currentTarget.addEventListener("pressup", this.droppedCallback);
    });

  }

  addBlock(fnName) {
    let newBlk = this.set.addBlock(fnName);
    newBlk.block_id = newBlk.container.id;
    if(newBlk.type === 'loop') {
      debugger
      newBlk.container.addEventListener("click", this.drawArrow);
      this.loops.push(newBlk);
    }

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
        this.checkForLoop(blk);
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
