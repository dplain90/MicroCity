import React from 'react';
import PaletteContainer from './palette/palette_container';
import { Block, BlockSet } from '../../blocks/block';
import BasicBlock from '../blocks/types/basic';
import Editor from '../block_list/editor';
import Palette from '../block_list/palette';
import EditorContainer from './editor/editor_container';
import { calcNextBlockPos } from '../../blocks/block_util';
import BlockList from '../block_list/block_list';
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
      this.stageTest = this.stageTest.bind(this);
      this.state = {
        category: 'motion'
      };
  }

  componentDidMount() {
    let sampleData = {
      x: 5,
      blocks: {
        1:{
          offset: 10,
          name: 'jump',
          type: 'basic',
          color: '#fff',
          scaleX: 0.5,
          scaleY: 0.5,
          font: "7.5px Audiowide, cursive",
          fn: function() {
            let result = [{animation: 'jump'}];
            [1, -1].forEach( (dir) => {
                let frame = {x: 0, y: 10 * dir};
                for (let i = 0; i < 3; i++) result.push(frame);
                result.push({x: 10, y: 0});
            });
            return result;
          },
          fnParams: []
        },

      2: {
          offset: 10,
          name: 'step',
          type: 'basic',
          color: '#fff',
          scaleX: 0.5,
          scaleY: 0.5,
          font: "7.5px Audiowide, cursive",
          fn: function(num) {
            let result = [{animation: 'move'}];
            let frame = { x: 5, y: 0 };
            for (let i = 0; i < num; i++) result.push(frame);
            return result;
          },
         fnParams: [2]
        },
      3: {
        offset: 10,
        name: 'forward',
        type: 'basic',
        color: '#fff',
        scaleX: 0.5,
        scaleY: 0.5,
        font: "6.5px Audiowide, cursive",
        fn: function() {
          let result = [{animation: 'move'}];
          let frame = { x: 5, y: 0 };
          for (let i = 0; i < 2; i++) result.push(frame);
          return result;
        },
        fnParams: []
      },
      4: {
        offset: 10,
        name: 'repeat',
        type: 'loop',
        color: '#fff',
        scaleX: 0.5,
        scaleY: 0.5,
        font: "7.5px Audiowide, cursive",
        fn: function(num, increment) {
          if(increment >= num) {
            this.completed = true;
            this.fnParams = [num, 0];
          } else {
          this.fnParams = [num, increment + 1];
          }
        }
      },
      5: {
        offset: 10,
        name: 'textField',
        type: 'textInput',
        inputType: 'input',
        color: '#fff',
        scaleX: 0.5,
        scaleY: 0.5,
        font: "7.5px Audiowide, cursive",
        fn: function() {
          return null;
        },
        fnParams: [],

      }
    },
    manifest: {
      "path": "images/blocks/",
       "manifest": [
          {"src": "microchip1.png", "id":"forward"},
          {"src": "microchip1.png", "id":"step"},
          {"src": "microchip1.png", "id":"jump"},
          {"src": "microchip1.png", "id":"repeat"},
          {"src": "conditionBlock.png", "id":"textField"}
       ]
    }
  };


  let editorData = {
    x: 100,
    width: 150,
    height: 250
  };
    // this.blockList.each((block) => { this.stage.addChild(block) });
    // this.newBlock = new BasicBlock(sampleData);
    this.stage = new createjs.Stage("workstationCanvas");
    this.stage.snapToPixelEnabled = true;
     this.stage.regX = this.stage.regY = -.5;
    this.palette = new Palette(this.stage, sampleData);
    this.editor = new Editor(this.stage, editorData);
    window.editor = this.editor;
    window.palette = this.palette;
    this.stage.enableMouseOver(10);
    this.stage.mouseMoveOutside = true;
    this.stage.isMainStage = true;
    let cxt = this.stage.canvas.getContext("2d");
    cxt.webkitImageSmoothingEnabled = cxt.mozImageSmoothingEnabled = true;
    // this.stage.addChild(this.newBlock);
    // this.editor = new Editor(this.props.code, this.stage);
    window.stage = this.stage;
    // this.paletteSet = new BlockSet({
    //   category: this.state.category,
    //   y_increment: 20,
    //   start_pos: { x: 0, y: 50 },
    //   code: this.props.code,
    //   parent: this.stage
    // });
    //
    // this.numeratorSet = new BlockSet({
    //   category: 'numerator',
    //   y_increment: 15,
    //   start_pos: { x: 35, y: 50},
    //   code: this.props.code,
    //   parent: this.stage
    // });

    // this.addCloneListener(this.paletteSet);
    // this.addCloneListener(this.numeratorSet);
    this.stage.update();
    createjs.Ticker.addEventListener("tick", this.handleTick);
    this.props.updateCode(this.editor.code);
    // this.props.updateCode(this.props.code);
  }

  stageTest(e){
    console.log(e);


      console.log(this.stage.getObjectsUnderPoint(e.mouseX, e.mouseY));
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
        <canvas id="workstationCanvas" width="450px" height="450px">
        </canvas>
      </div>
    );

  }
}


export default WorkStation;
