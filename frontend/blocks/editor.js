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
      start_pos: { x: 110, y: 0 },
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



  checkForLoop(obj, newBlk){
    // for (var i = 0; i < this.loops.length; i++) {
    //
    //   let loop = this.loops[i];
    //   let container = loop.container.getBounds();
    //
    //   if(obj.y + obj.offSet >= container.y && obj.y - obj.offSet <= container.y + container.height && newBlk.block_id !== loop.block_id) {
    //     loop.addCallback(newBlk.container);
    //
    //     newBlk.container.x = newBlk.originX = loop.container.x + 45;
    //     newBlk.container.y = newBlk.originY = loop.container.y + (loop.callback.length * 20);
    //
    //   }
    // }
  }

  addArrow(x, y, stage) {
    let arrowContainer = new createjs.Container();
    let arrow = new createjs.Shape();
    let arrowHead = new createjs.Shape();

    stage.addChild(arrow, arrowHead);
    return (e) => {
      arrow.graphics.clear();
      arrowHead.graphics.clear();
      arrow.graphics.beginStroke("blue").moveTo(x, y).bezierCurveTo(x + 60, y + ((e.stageY - y) / 3), x + 40, y + ((e.stageY - y) / 2), e.stageX + 10, e.stageY - 10);

      let yDiff = (e.stageY - 10) - (y + ((e.stageY - y) / 3));
      let xDiff = (e.stageX + 10) - (x + 40);
      let direction = Math.atan2(yDiff, xDiff) / Math.PI * 180;

      arrowHead.graphics.beginFill("black").dp(e.stageX + 10 , e.stageY - 10, 8, 3);
      console.log(arrowHead.rotation);
      arrowHead.regX = e.stageX + 10;
      arrowHead.regY = e.stageY - 10;
       arrowHead.rotation = direction;
      arrowHead.x = e.stageX + 10;
      arrowHead.y = e.stageY - 10;
      console.log(e.stageY);
      console.log(arrowHead.regY);


      stage.update();
      //

      // arrow.graphics.beginStroke("blue").moveTo(x, y).bezierCurveTo(x + 60, y + ((e.stageY - y) / 3), x + 40, y + ((e.stageY - y) / 2), e.stageX, e.stageY);

      // stage.on("stagemousemove", (e) => {
      //   arrow.graphics.clear();
      //   arrow.graphics.beginStroke("blue").moveTo(x, y).bezierCurveTo(x + 40, y + ((e.stageY - y) / 3), x + 40, y + ((e.stageY - y) / 2), e.stageX, e.stageY);
      //   stage.update();
      // });


    };
  }

  drawArrow(e){
    // debugger
    // Block.turnOffListeners(e.currentTarget, ["mouseup", "pressmove", "mousedown", "click"]);
    // e.currentTarget.off("pressmove", this.dragCallback);
    // e.currentTarget.off("pressup", this.droppedCallback);
    e.currentTarget.removeAllEventListeners();
    let callback = this.addArrow(e.currentTarget.x + 170, e.currentTarget.y + 28 + e.currentTarget.offSet, this.stage);
     this.stage.enableMouseOver(10);
  let arrowListener = this.stage.on("stagemousemove", callback);

    let stage = this.stage;
    let set = this.set;
    this.stage.on("stagemouseup", (evt) => {
      let endPos = { x: evt.stageX, y: evt.stageY }
      e.currentTarget.parentBlock.addCallbacks(endPos, set);

      // stage.removeEventListener("stagemousemove", arrowListener);
      stage.removeAllEventListeners();
      stage.update();
      e.currentTarget.addEventListener("pressmove", this.dragCallback);
      e.currentTarget.addEventListener("pressup", this.droppedCallback);
    });

    // let arrow = new createjs.Shape();
    // arrow.graphics.beginStroke("blue").moveTo(-5, +5).lineTo(e.stageX, e.stageY).lineTo(-5, -5);
    //
    // let degree = 340 / Math.PI * 180;
    // arrow.x = e.currentTarget.x + 80;
    // arrow.y = e.currentTarget.y + 30;
    // arrow.rotation = degree;
    //
    // this.container.addChildAt(arrow,0);
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
