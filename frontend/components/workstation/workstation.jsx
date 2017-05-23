import React from 'react';
import PaletteContainer from './palette/palette_container';
import { Block, BlockSet } from '../../blocks/block';
import BasicBlock from '../blocks/types/basic';
import Editor from '../../blocks/editor';
import EditorContainer from './editor/editor_container';
import { calcNextBlockPos } from '../../blocks/block_util';
import BlockList from '../blocks/block_list';
import { generateEditor } from '../../util/editor_util';
import { findBlock } from '../../blocks/block_constants';
import { populateBlocks, addInputBar, removeInputBar } from '../../blocks/populateBlocks';
class WorkStation extends React.Component {
  constructor(props){
    super(props);
      this.handleInput = this.handleInput.bind(this);
      this.cloneBlock = this.cloneBlock.bind(this);
      this.dragCallback = this.dragCallback.bind(this);
      this.addCloneListener = this.addCloneListener.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleTick = this.handleTick.bind(this);
      this.addCodeBlock = this.addCodeBlock.bind(this);
      this.state = {
        category: 'motion'
      };
  }

  componentDidMount() {
    let sampleData = {
      x: 10,
      y: 10,
      name: 'Test',
      color: '#fff',
      scaleX: .8,
      scaleY: .8,
      font: "6.5px Audiowide, cursive"
    };

    let sampleBlocks = {
    1:{
        x: 10,
        y: 40,
        name: 'Test2',
        type: 'basic',
        color: '#fff',
        scaleX: .8,
        scaleY: .8,
        font: "6.5px Audiowide, cursive"
      },

    2: {
        x: 10,
        y: 50,
        name: 'Test3',
        type: 'basic',
        color: '#fff',
        scaleX: .8,
        scaleY: .8,
        font: "6.5px Audiowide, cursive"
      },
    3: {
      x: 10,
      y: 60,
      name: 'Test4',
      type: 'basic',
      color: '#fff',
      scaleX: .8,
      scaleY: .8,
      font: "6.5px Audiowide, cursive"
    }
  };


    // this.blockList.each((block) => { this.stage.addChild(block) });
    this.newBlock = new BasicBlock(sampleData);
    this.stage = new createjs.Stage("workstationCanvas");
    this.blockList = new BlockList(sampleBlocks, this.stage);
    this.stage.enableMouseOver(10);
    this.stage.mouseMoveOutside = true;
    this.stage.isMainStage = true;
    this.stage.addChild(this.newBlock);
    this.editor = new Editor(this.props.code, this.stage);
    window.stage = this.stage;
    this.paletteSet = new BlockSet({
      category: this.state.category,
      y_increment: 20,
      start_pos: { x: 0, y: 50 },
      code: this.props.code,
      parent: this.stage
    });

    this.numeratorSet = new BlockSet({
      category: 'numerator',
      y_increment: 15,
      start_pos: { x: 35, y: 50},
      code: this.props.code,
      parent: this.stage
    });

    this.addCloneListener(this.paletteSet);
    this.addCloneListener(this.numeratorSet);
    this.stage.update();
    createjs.Ticker.addEventListener("tick", this.handleTick);

    // this.props.updateCode(this.props.code);
  }

  handleTick(event){
     this.stage.update();
  }

  addCloneListener(blockSet){
    let set = blockSet.set;
    for (let block of set) {
       block.container.on("mousedown", this.cloneBlock(blockSet));
    }
  }

  handleInput(e) {
    this.props.addArg(e.currentTarget.id, e.currentTarget.value);
  }

  cloneBlock(blockSet) {
    return (e) => {
      let clone = Block.cloneBlock(e.currentTarget, this.props.code, blockSet);
      const listeners = [
            { type: "stagemousedown", callback: this.dragCallback },
            { type: "pressmove", callback: this.dragCallback },
            { type: "pressup", callback: this.editor.droppedCallback }
          ];
      clone.addListeners(listeners);
      this.stage.update();
    }
  }


  dragCallback(e){
    let offset = e.stageY - (e.stageY * .70);
    let offset2 = e.stageY / 30;
    let third = (e.stageY * .5);

    e.currentTarget.x = e.stageX - 30 ;
    e.currentTarget.y = e.stageY - 30 - e.currentTarget.offSet;

    this.stage.update();
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
