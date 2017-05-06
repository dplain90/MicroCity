import React from 'react';
import PaletteContainer from './palette/palette_container';
import EditorContainer from './editor/editor_container';
import { calcNextBlockPos } from '../../blocks/block_util';
import { generateEditor } from '../../util/editor_util';
import { populateBlocks, addInputBar, removeInputBar } from '../../blocks/populateBlocks';
class WorkStation extends React.Component {
  constructor(props){
    super(props);
      this.handleInput = this.handleInput.bind(this);
      this.createBlocks = this.createBlocks.bind(this);
      this.cloneBlock = this.cloneBlock.bind(this);
      this.dragCallback = this.dragCallback.bind(this);
      this.dropCallback = this.dropCallback.bind(this);

      this.handleClick = this.handleClick.bind(this);
      this.handleTick = this.handleTick.bind(this);

      this.addCodeBlock = this.addCodeBlock.bind(this);
      this.removeInputBar = removeInputBar.bind(this);
      this.state = {
        category: 'motion'
      };
  }

  componentDidMount() {
    this.stage = new createjs.Stage("workstationCanvas");
    this.createBlocks();
    this.editorContainer = generateEditor(this.stage);
    window.stage = this.stage;
    this.stage.addChild(this.editorContainer);
    window.editor = this.editorContainer;
    this.stage.update();
    createjs.Ticker.addEventListener("tick", this.handleTick);
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
      this.stage.update();
    }
  }


  handleInput(e) {
    this.props.addArg(e.currentTarget.id, e.currentTarget.value);
  }

  cloneBlock(e) {
    let blockClone = e.currentTarget.clone(true);
    blockClone.fnName = e.currentTarget.fnName;
    blockClone.hasInput = e.currentTarget.hasInput;
    if(blockClone.hasInput) addInputBar(blockClone, this);
    this.stage.addChild(blockClone);
    blockClone.on("pressmove", this.dragCallback);
    blockClone.on("pressup", this.dropCallback);
    this.stage.update();
  }

  dragCallback(e){
    e.currentTarget.x = e.stageX - 20;
    e.currentTarget.y = e.stageY - 15;
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
    blk.off("mouseup");
    blk.off("pressmove");
    if(blkX > nearX && blkX < farX && blkY > topY && blkY < bottomY){
      this.editorContainer.addChildAt(blk, 1);
      let { x: newX, y: newY } = calcNextBlockPos(this.editorContainer);
      blk.x = newX;
      blk.y = newY;

      this.stage.update();
      this.addCodeBlock(blk.id, blk.fnName);
    } else {
      if(blk.hasInput) this.removeInputBar(blk.id);
      this.stage.removeChild(blk);
      if(this.editorContainer.contains(blk)){
        this.editorContainer.removeChild(blk);
        this.props.removeCode(blk.id);
      }
      this.stage.update();
    }
  }

  addCodeBlock(id, fnName){
    let newBlock = {};
    newBlock[id] = { fn: fnName, args: []};
    this.props.updateCode(newBlock);
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
        <canvas id="workstationCanvas" width="450px" height="300px">

        </canvas>
      </div>
    );

  }
}


export default WorkStation;
