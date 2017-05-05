import React from 'react';
import PaletteContainer from './palette/palette_container';
import EditorContainer from './editor/editor_container';
import { populateBlocks } from '../../blocks/populateBlocks';
class WorkStation extends React.Component {
  constructor(props){
    super(props);
      this.cloneBlock = this.cloneBlock.bind(this);
      this.removeCodeBlock = this.removeCodeBlock.bind(this);
      this.dragCallback = this.dragCallback.bind(this);
      this.populatePalette = this.populatePalette.bind(this);
      this.dropCallback = this.dropCallback.bind(this);
      this.generateEditor = this.generateEditor.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleTick = this.handleTick.bind(this);
      this.calcNextBlockPos = this.calcNextBlockPos.bind(this);
      this.addCodeBlock = this.addCodeBlock.bind(this);
  }

  componentDidMount() {
    this.stage = new createjs.Stage("workstationCanvas");

    this.blocks = populateBlocks(this.stage, this.robot);
    this.moveBlock = this.blocks[0];
    this.stepsBlock = this.blocks[1];
    this.moveBlock.on("mousedown", this.cloneBlock);
    this.stepsBlock.on("mousedown", this.cloneBlock);
    // this.moveBlock.on("pressmove", this.dragCallback);
    // this.moveBlock.on("pressup", this.dropCallback);
    // this.stepsBlock.on("pressmove", this.dragCallback);
    // this.stepsBlock.on("pressup", this.dropCallback);
    this.stage.addChild(this.moveBlock, this.stepsBlock,  this.generateEditor());

    this.stage.update();
  }

  handleTick(event){
     this.stage.update();
  }


  populatePalette() {
    this.workstationContainer = new createjs.Container();
    this.workstationContainer.setBounds(0,0, this.stage.width, this.stage.height);
    this.workstationContainer.addChild(this.moveBlock, this.generateEditor());

  }


  cloneBlock(e) {

    let blockClone = e.currentTarget.clone(true);
    blockClone.fnName = e.currentTarget.fnName;
    this.stage.addChild(blockClone);
    blockClone.on("pressmove", this.dragCallback);
    blockClone.on("pressup", this.dropCallback);

    this.stage.update();
  }

  dragCallback(e){
    e.currentTarget.x = e.stageX - 40;
    e.currentTarget.y = e.stageY - 40;
    this.stage.update();
  }

  dropCallback(e){
    let editorBounds = this.editorContainer.getBounds().clone();
    let farX = editorBounds.x + 200;
    let nearX = editorBounds.x;
    let topY = editorBounds.y;
    let bottomY = editorBounds.y + 600;
    let blkX = e.currentTarget.x;
    let blkY = e.currentTarget.y;

    if(blkX > nearX && blkX < farX && blkY > topY && blkY < bottomY){
      let { x: newX, y: newY } = this.calcNextBlockPos();
      e.currentTarget.x = newX;
      e.currentTarget.y = newY;
      this.stage.update(e);
      this.editorContainer.addChild(e.currentTarget);
      e.currentTarget.off("mousedown");
      debugger
      this.addCodeBlock({ fn: e.currentTarget.fnName, args: [] });
    } else {
      if(this.editorContainer.contains(e.currentTarget)){
        this.editorContainer.removeChild(e.currentTarget);
        this.stage.removeChild(e.currentTarget);
        this.stage.update();
        this.removeCodeBlock(e.currentTarget.fnName);
      }

    }
  }

  calcNextBlockPos() {
    let children = this.editorContainer.children;
     let blockCount = children.length;
     if(blockCount === 1) {
       return { x: 210, y: 10 };
     } else {
       let lastChild = children[blockCount - 1];
       let lastChildBounds = lastChild.getBounds();
       return {
         x: 210,
         y: lastChildBounds.y + (lastChildBounds.height + 10)
       };
     }
  }
  removeCodeBlock(fnName){
    let updatedCode = [];
    for (var i = 0; i < this.props.code.length; i++) {
      if(this.props.code[i].fn !== fnName) {
        updatedCode.push(this.props.code[i]);
      }
    }
  }

  addCodeBlock(fnName){
    let updatedCode = this.props.code.concat(fnName);
    this.props.updateCode(updatedCode);
  }

  generateEditor(){
    this.editorContainer = new createjs.Container();
    this.editorBox = new createjs.Shape();
    this.editorBox.graphics.beginStroke("black").drawRect(200, 5, 200, 600);
    this.editorContainer.setBounds(150, 0, 150, this.stage.height);
    this.editorContainer.addChild(this.moveBlock, this.editorBox );

    return this.editorContainer;
  }

  handleClick(e){
    let { updateToggle, toggle } = this.props
    e.preventDefault();
    if(toggle.paletteType == "text") {
      updateToggle({paletteType: "block"});
    } else {
      updateToggle({paletteType: "text"});
    }
  }

  render(){
    return (
      <div className="workstation">
        <canvas id="workstationCanvas" width="500px" height="500px">

        </canvas>
      </div>
    );

  }
}


export default WorkStation;
