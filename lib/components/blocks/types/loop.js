import BasicBlock from './basic';
import ParentCode from '../../code/parent_code';
import Editor from '../../block_list/editor';
import TextInput from './text_input';
import SelectInput from './select_input';
import { addPlusButton } from '../../mixins/buttons';
import ParentNode from '../parent_node';
class Loop extends ParentNode {
  constructor(data){
    super(data);
    let { codeChildren, input } = data;
    if(codeChildren === undefined) codeChildren = new Set();
    this.closed = false;
    this.editorCallbackComplete = false;
    this.codeChildren = codeChildren;
    this.drawConnector = this.drawConnector.bind(this);
    this.addConnector = this.addConnector.bind(this);
    this.onEditorCallback = this.onEditorCallback.bind(this);
    this.handleHoverOut = this.handleHoverOut.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.addLoopButton = this.addLoopButton.bind(this);
    this.turnOnListeners = this.turnOnListeners.bind(this);
    this.drawLoopButton = this.drawLoopButton.bind(this);
    this.updateParams = this.updateParams.bind(this);
    this.reset = this.reset.bind(this);
    this.remove = this.remove.bind(this);
    this.completed = false;
    this.inputData = input;
  let manifest = {
    "path": "assets/images/blocks/",
     "manifest": [
        {"src": "conditionBlock.png", "id":"textField"}
     ]
  };

  this.queue = new createjs.LoadQueue(true);
  this.queue.loadManifest(manifest);

  }

  onEditorCallback(){
    Object.assign(this.constructor.prototype, { addPlusButton: addPlusButton.bind(this)});
    this.addLoopButton();
    this.addPlusButton();
    let inputData = Object.assign(this.inputData, {
      prev: this,
      x: this.x,
      img: this.queue.getResult('textField')
    });

    if(inputData.type === 'textField'){
      this.inputField = new TextInput(inputData);
    } else {
      this.inputField = new SelectInput(inputData);
      this.updateParams(this.inputField.options[0].value);
    }
    this.addChild(this.inputField);
    this.inputField.y = 0;
    this.inputField.x = this.width + 2;
    this.stage.update();
  }

  updateParams(val) {
    this.fnParams = val;
  }

  remove(){
    this.clearNodes();
    if(this.line) this.line.graphics.clear();
    if(this.inputField !== undefined){
      this.inputField.removeDOM();
    }

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
    if(this.childNodes.size < 1) {
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
    if(this.childNodes.size < 1) return null;

    let lastNode = this.lastNode();
    this.line.graphics.clear();
    this.circle.graphics.clear();
    this.stage.removeChild(this.circle);

    this.constructor.prototype.drawLoopButton.call(lastNode);
    lastNode.fillInnerRect.style = "#e1a412";
    let width = this.width;
    let loopY = this.y + this.height - 15 + 1.07 - 0.10 ;
    let lastY = lastNode.y + (lastNode.height - 15 + 0.47);
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
}

export default Loop;
