import React from 'react';
import Editor from '../block_list/editor';
import Palette from '../block_list/palette';
import BlockList from '../block_list/block_list';

class WorkStation extends React.Component {
  constructor(props){
    super(props);
    this.handleTick = this.handleTick.bind(this);
    this.state = {
      category: 'motion'
    };
  }

  componentDidMount() {
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
    this.palette = new Palette(this.stage, this.props.blockData);
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
    this.stage.update();
    createjs.Ticker.addEventListener("tick", this.handleTick);
    this.props.updateCode(this.editor.code);
    // this.props.updateCode(this.props.code);
  }
  handleTick(e){
     this.stage.update();
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

//
// let sampleData = {
//   x: 5,
//   blocks: {
//     1:{
//       offset: 10,
//       name: 'jump',
//       type: 'basic',
//       color: '#fff',
//       scaleX: 0.5,
//       scaleY: 0.5,
//       font: "7.5px Audiowide, cursive",
//       fn: function() {
//         let result = [{animation: 'jump'}];
//         [1, -1].forEach( (dir) => {
//             let frame = {x: 0, y: 10 * dir};
//             for (let i = 0; i < 3; i++) result.push(frame);
//             result.push({x: 10, y: 0});
//         });
//         return result;
//       },
//       fnParams: []
//     },
//
//   2: {
//       offset: 10,
//       name: 'step',
//       type: 'basic',
//       color: '#fff',
//       scaleX: 0.5,
//       scaleY: 0.5,
//       font: "7.5px Audiowide, cursive",
//       fn: function(num) {
//         let result = [{animation: 'move'}];
//         let frame = { x: 5, y: 0 };
//         for (let i = 0; i < num; i++) result.push(frame);
//         return result;
//       },
//      fnParams: [2]
//     },
//   3: {
//     offset: 10,
//     name: 'forward',
//     type: 'basic',
//     color: '#fff',
//     scaleX: 0.5,
//     scaleY: 0.5,
//     font: "6.5px Audiowide, cursive",
//     fn: function() {
//       let result = [{animation: 'move'}];
//       let frame = { x: 5, y: 0 };
//       for (let i = 0; i < 2; i++) result.push(frame);
//       return result;
//     },
//     fnParams: []
//   },
//   4: {
//     offset: 10,
//     name: 'repeat',
//     type: 'loop',
//     color: '#fff',
//     scaleX: 0.5,
//     scaleY: 0.5,
//     font: "7.5px Audiowide, cursive",
//     fn: function(num, increment) {
//       if(increment >= num) {
//         this.completed = true;
//         this.fnParams = [num, 0];
//       } else {
//       this.fnParams = [num, increment + 1];
//       }
//     }
//   }
// },
// manifest: {
//   "path": "images/blocks/",
//    "manifest": [
//       {"src": "microchip1.png", "id":"forward"},
//       {"src": "microchip1.png", "id":"step"},
//       {"src": "microchip1.png", "id":"jump"},
//       {"src": "microchip1.png", "id":"repeat"},
//       {"src": "conditionBlock.png", "id":"textField"}
//    ]
// }
// };






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
