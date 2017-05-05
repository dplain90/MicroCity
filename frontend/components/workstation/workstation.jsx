import React from 'react';
import PaletteContainer from './palette/palette_container';
import EditorContainer from './editor/editor_container';
import { populateBlocks } from '../../blocks/populateBlocks';
class WorkStation extends React.Component {
  constructor(props){
    super(props);
      this.createBlocks = this.createBlocks.bind(this);
      this.cloneBlock = this.cloneBlock.bind(this);
      this.dragCallback = this.dragCallback.bind(this);
      this.populatePalette = this.populatePalette.bind(this);
      this.dropCallback = this.dropCallback.bind(this);
      this.generateEditor = this.generateEditor.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleTick = this.handleTick.bind(this);
      this.calcNextBlockPos = this.calcNextBlockPos.bind(this);
      this.addCodeBlock = this.addCodeBlock.bind(this);
      this.state = {
        category: 'motion'
      };
  }

  componentDidMount() {
    this.stage = new createjs.Stage("workstationCanvas");
    this.createBlocks();
    window.stage = this.stage;
    this.stage.addChild(this.generateEditor());
    window.editor = this.editorContainer;
    this.stage.update();
  }

  handleTick(event){
     this.stage.update();
  }

  createBlocks(){
    this.blocks = populateBlocks(this.stage, this.robot, this.state.category);
    for (var i = 0; i < this.blocks.length; i++) {
      let block = this.blocks[i];
      block.on("mousedown", this.cloneBlock);
      this.stage.addChild(block);
      block.visible = true;
      this.stage.update();
    }
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
    let blk = e.currentTarget;
    let blkX = blk.x;
    let blkY = blk.y;

    if(blkX > nearX && blkX < farX && blkY > topY && blkY < bottomY){
      this.editorContainer.addChildAt(e.currentTarget, 1);
      let { x: newX, y: newY } = this.calcNextBlockPos();
      blk.x = newX;
      blk.y = newY;
      this.stage.update(e);

      blk.off("mousedown");
      this.addCodeBlock(blk.id, blk.fnName);
    } else {
      if(this.editorContainer.contains(blk)){
        this.editorContainer.removeChild(blk);
        this.stage.removeChild(blk);
        this.stage.update();
        this.props.removeCode(blk.id);

      }

    }
  }

  calcNextBlockPos() {
    let children = this.editorContainer.children;

     let blockCount = children.length;
     if(blockCount === 2) {
       return { x: 210, y: 10 };
     } else {
       let lastChild = children[2];
       let lastChildBounds = lastChild.getBounds();

       return {
         x: lastChild.x,
         y: lastChild.y + 30
       };
     }
  }


  addCodeBlock(id, fnName){
    let updatedCode = Object.assign({}, this.props.code);
    updatedCode[id] = { fn: fnName, args: [] };
    this.props.updateCode(updatedCode);
  }

  generateEditor(){
    this.editorContainer = new createjs.Container();
    this.editorBox = new createjs.Shape();
    this.editorBox.graphics.beginStroke("black").beginFill("black").drawRect(200, 5, 200, 600);
    this.editorContainer.setBounds(150, 0, 150, this.stage.height);
    this.editorContainer.addChild(this.editorBox);
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
        <canvas id="workstationCanvas" width="400px" height="300px">

        </canvas>
      </div>
    );

  }
}


export default WorkStation;
