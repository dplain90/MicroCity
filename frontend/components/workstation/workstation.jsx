import React from 'react';
import PaletteContainer from './palette/palette_container';
import * as CodeModule from '../../blocks/code';

import Editor from '../../blocks/editor';
import EditorContainer from './editor/editor_container';
import { calcNextBlockPos } from '../../blocks/block_util';
import BlockSet from '../../blocks/block';
import { generateEditor } from '../../util/editor_util';
import { findBlock } from '../../blocks/block_constants';
import { populateBlocks, addInputBar, removeInputBar } from '../../blocks/populateBlocks';
class WorkStation extends React.Component {
  constructor(props){
    super(props);
      this.handleInput = this.handleInput.bind(this);
      // this.createContainers = this.createContainers.bind(this);
      this.cloneBlock = this.cloneBlock.bind(this);
      this.dragCallback = this.dragCallback.bind(this);
      this.dropCallback = this.dropCallback.bind(this);
      this.addContainers = this.addContainers.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleTick = this.handleTick.bind(this);

      this.addCodeBlock = this.addCodeBlock.bind(this);
      this.removeInputBar = removeInputBar.bind(this);
      // this.code = new CodeModule.Code();

      this.state = {
        category: 'motion'
      };
  }

  componentDidMount() {
    this.stage = new createjs.Stage("workstationCanvas");
    this.set = BlockSet.createSet(this.state.category, 20, { x: 20, y: 140}, this.props.code);
    this.addContainers();
    this.editorContainer = Editor.createEditor(this.stage);
    this.stage.addChild(this.editorContainer);
    this.editor = new Editor(this.editorContainer, this.props.code);
    this.stage.update();
    createjs.Ticker.addEventListener("tick", this.handleTick);
    // this.props.updateCode(this.props.code);
  }

  handleTick(event){
     this.stage.update();
  }

  addContainers(){
    let containers = this.set.containers;
    for (var i = 0; i < containers.length; i++) {
      let container = containers[i];
      container.on("mousedown", this.cloneBlock);
      this.stage.addChild(container);
      this.stage.update();
    }
  }


  handleInput(e) {
    this.props.addArg(e.currentTarget.id, e.currentTarget.value);
  }

  cloneBlock(e) {
    // e.currentTarget
    let blockClone = e.currentTarget.clone(true);
    blockClone.fnName = e.currentTarget.fnName;
    blockClone.hasInput = e.currentTarget.hasInput;
    // if(blockClone.hasInput) addInputBar(blockClone, this);
    this.stage.addChild(blockClone);
    blockClone.on("stagemousedown", this.dragCallback);
    blockClone.on("pressmove", this.dragCallback);
    blockClone.on("pressup", this.dropCallback);
    // this.dragCallback(blockClone);
    this.stage.update();
  }

  dragCallback(e){
    e.currentTarget.x = e.stageX - 20;
    e.currentTarget.y = e.stageY - 15;
    this.stage.update();
  }
  // this.addCodeBlock(blk.id, blk.fnName);
  // if(this.editorContainer.contains(blk)){
  //   this.editorContainer.removeChild(blk);
  //   this.props.removeCode(blk.id);
  // }

  dropCallback(e){
    let blk = e.currentTarget;

    blk.off("mouseup");
    blk.off("pressmove");
    blk.off("mousedown");

    if(this.editor.onEditor(blk)) {
      this.editor.addBlock(e.currentTarget.fnName);
      this.stage.update();
    } else {
      if(blk.hasInput) this.removeInputBar(blk.id);
      this.stage.removeChild(blk);
      this.editor.removeBlock(blk);
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
