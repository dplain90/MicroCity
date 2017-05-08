import React from 'react';
import PaletteContainer from './palette/palette_container';
import { Block, BlockSet } from '../../blocks/block';

import Editor from '../../blocks/editor';
import EditorContainer from './editor/editor_container';
import { calcNextBlockPos } from '../../blocks/block_util';
import * as BlockUtil from '../../blocks/block';
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
      this.dragEditorCallback = this.dragEditorCallback.bind(this);
      this.addCodeBlock = this.addCodeBlock.bind(this);
      this.removeInputBar = removeInputBar.bind(this);
      // this.code = new CodeModule.Code();
      this.listeners = [
            { type: "stagemousedown", callback: this.dragCallback },
            { type: "pressmove", callback: this.dragCallback },
            { type: "pressup", callback: this.dropCallback }
          ];

      this.editorListeners = [
            { type: "stagemousedown", callback: this.dragEditorCallback },
            { type: "pressmove", callback: this.dragEditorCallback },
            { type: "pressup", callback: this.dropCallback }
          ];

      this.state = {
        category: 'motion'
      };
  }

  componentDidMount() {
    this.stage = new createjs.Stage("workstationCanvas");
    this.stage.mouseMoveOutside = true;
    this.set = BlockSet.createSet(this.state.category, 20, 0, 50, this.props.code);

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
    let blocks = this.set.set;

    for (var i = 0; i < containers.length; i++) {
      let container = containers[i];
      let block = blocks[i];
      container.on("mousedown", this.cloneBlock);
      this.stage.addChild(container);
      this.stage.update();

    }

  }


  handleInput(e) {
    this.props.addArg(e.currentTarget.id, e.currentTarget.value);
  }

  cloneBlock(e) {
    let clone = Block.cloneBlock(e.currentTarget, this.props.code);
    clone.addListeners(this.listeners);

    // blockClone.hasInput = e.currentTarget.hasInput;
    // if(blockClone.hasInput) addInputBar(blockClone, this);
    this.stage.addChild(clone.container);
    this.stage.update();
  }

  dragCallback(e){
    let offset = e.stageY - (e.stageY * .70);
    let offset2 = e.stageY / 30;
    let third = (e.stageY * .5);

    e.currentTarget.x = e.stageX - 30 ;
    e.currentTarget.y = e.stageY - 30 - e.currentTarget.offSet;

    // e.currentTarget.x = e.stageX;
    //
    // e.currentTarget.y = e.stageY;


    this.stage.update();
  }


  dragEditorCallback(e) {
    e.currentTarget.x = e.stageX - 150;
    e.currentTarget.y = e.stageY - 30 - e.currentTarget.offSet;
    this.stage.update();

  }
  // - 30;
  // - 47;
  // this.addCodeBlock(blk.id, blk.fnName);
  // if(this.editorContainer.contains(blk)){
  //   this.editorContainer.removeChild(blk);
  //   this.props.removeCode(blk.id);
  // }

  dropCallback(e){
    let blk = e.currentTarget;
    Block.turnOffListeners(blk, ["mouseup", "pressmove", "mousedown"]);

    if(this.editor.onEditor(blk) && !this.editor.editor.contains(blk) ) {
      this.stage.removeChild(blk);
      let newBlk = this.editor.addBlock(e.currentTarget.fnName);
      this.editor.checkForLoop(blk, newBlk);

      newBlk.addListeners(this.editorListeners);
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
        <canvas id="workstationCanvas" width="350px" height="350px">

        </canvas>
      </div>
    );

  }
}


export default WorkStation;
