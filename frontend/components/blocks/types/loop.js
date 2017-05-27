import BasicBlock from './basic';
import ParentCode from '../../code/parent_code';
import Editor from '../../block_list/editor';
import { addPlusButton } from '../../mixins/buttons';
class Loop extends BasicBlock {
  constructor(data){
    super(data);
    let { codeChildren } = data;
    if(codeChildren === undefined) codeChildren = new Set();
    this.editorCallbackComplete = false;
    this.codeChildren = codeChildren;
    this.addArrow = this.addArrow.bind(this);
    this.drawConnector = this.drawConnector.bind(this);
    this.addConnector = this.addConnector.bind(this);
    this.drawArrow = this.drawArrow.bind(this);
    this.onEditorCallback = this.onEditorCallback.bind(this);
    this.handleHoverOut = this.handleHoverOut.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.addLoopButton = this.addLoopButton.bind(this);
    this.turnOnListeners = this.turnOnListeners.bind(this);
    this.drawLoopButton = this.drawLoopButton.bind(this);
    this.reset = this.reset.bind(this);
    this.remove = this.remove.bind(this);
    this.completed = false;
  }

  onEditorCallback(){
    Object.assign(this.constructor.prototype, { addPlusButton: addPlusButton.bind(this)});
    this.addLoopButton();
    this.addPlusButton();
  }

  remove(){
    ParentCode.clearChildren(this);
    if(this.line) this.line.graphics.clear();
    this.editor.head.constructor.prototype.remove.call(this);
  }

  drawLoopButton() {
    let { x, y, width, height } = this.getTransformedBounds();
    let start = { x: width - 16, y: height - 15 };
    this.connectContainer = new createjs.Container();
    let loopButton = new createjs.Shape();
    loopButton.graphics
      .setStrokeStyle(1.5)
      .beginStroke("#1d2b34")
      .beginFill("#6A7F8D")
      .drawCircle(start.x, start.y, 6)
      .setStrokeStyle(2)
      .rr(start.x - 3.3, start.y - 1.5, 7, 3.5, 2);

    this.innerRect = new createjs.Shape();
    this.fillInnerRect = this.innerRect.graphics.beginFill("#6A7F8D").command;

    this.innerRect.graphics
      .beginStroke("#1d2b34")
      .setStrokeStyle(1.5)
      .rr(start.x - 3.3, start.y - 1.5, 7, 3.5, 2);

    this.connectContainer.addChild(loopButton, this.innerRect);
    this.addChild(this.connectContainer);
    this.innerRect.alpha = 1;
    this.stage.update();
  }

  addLoopButton(){
    this.mouseChildren = true;
    this.drawLoopButton();
    this.connectContainer.on("rollover", this.handleHover);
    this.connectContainer.on("rollout", this.handleHoverOut);
    this.editorCallbackComplete = true;
  }

  reset(){
    if(this.codeChildren.size < 1) {
      this.line.graphics.clear();
      this.fillInnerRect.style = "#57667a";
    }
  }

  handleHoverOut(e){

    this.fillInnerRect.style = "#57667a";
    e.currentTarget.removeAllEventListeners("click");
    this.stage.on("stagemouseup", this.editor.dropCallback);
    this.stage.update();
  }

  turnOnListeners(){
    this.on("pressmove", this.dragCallback);
    this.on("stagemouseup", this.editor.dropCallback);
    this.connectContainer.on("rollover", this.handleHover);
    this.connectContainer.on("rollout", this.handleHoverOut);
  }

  completeConnection(){
    if(this.codeChildren.size < 1) return null;

    let lastChild = Array.from(this.codeChildren).pop();
    this.line.graphics.clear();
    this.circle.graphics.clear();
    this.stage.removeChild(this.circle);
    // this.drawLoopButton.call(lastChild);
    this.constructor.prototype.drawLoopButton.call(lastChild);
    lastChild.fillInnerRect.style = "#e1a412";
    let { width } = this.getTransformedBounds();
    let loopY = this.y + this.height - 15 + 1.07 - 0.10 ;
    let lastY = lastChild.y + (lastChild.height - 15 + 0.47);
    let x = this.x + (width - 19) - 0.25 + 0.47;

    this.line.graphics
    .setStrokeStyle(1)
    .beginStroke("#1d2b34")
    .moveTo(x + 8, loopY)
    .lineTo(x + 30, loopY)
    .lineTo(x + 30, lastY  )
    .lineTo(x + 8, lastY );

    this.line.alpha = 0.9;

    this.stage.update();
  }

  handleHover(e){
    this.removeAllEventListeners("mousemove");
    this.stage.removeAllEventListeners("stagemouseup");
    e.currentTarget.on("click", this.addConnector);
    this.cursor = "pointer";
    this.fillInnerRect.style = "#e1a412";
    this.stage.update();
  }

  drawConnector(x, y){
    this.line = new createjs.Shape();
    this.circle = new createjs.Shape();
    this.stage.addChild(this.line, this.circle);
    return (e) => {
      let topRight = { x: e.stageX + 20, y: y };
      let bottomRight = {x: e.stageX + 20, y: e.stageY };
      let onPointer = {x: e.stageX, y: e.stageY};
      console.log(topRight);
      console.log(bottomRight);
      console.log(onPointer);
      this.line.graphics.clear();
      this.circle.graphics.clear();
      y = this.y + this.height - 17;
      x = this.x + (this.width - 14);
      this.line.graphics.beginStroke("black")
        .moveTo(x,y)
        .lineTo(topRight.x, topRight.y)
        .lineTo(bottomRight.x, bottomRight.y)
        .lineTo(onPointer.x, onPointer.y);
      this.circle.graphics
        .beginStroke("black")
        .drawCircle(e.stageX, e.stageY, 2);
      this.stage.update();
    }
  }

  addConnector(e){
    e.currentTarget.removeAllEventListeners("rollout");
    this.stage.removeAllEventListeners();
    let { x: localX, y: localY } = this.mid;
    let { x, y } = this.localToGlobal(localX, localY);
    this.stage.on("stagemousemove", this.drawConnector(x, y));
    this.stage.on("stagemouseup", this.editor.addLoopChildren(this));
  }

  addArrow(x, y, stage) {
    this.arrow = new createjs.Shape();
    this.arrowHead = new createjs.Shape();

    this.stage.addChild(this.arrow, this.arrowHead);
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

      this.stage.update();
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


}

export default Loop;
