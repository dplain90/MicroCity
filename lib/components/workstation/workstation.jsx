import React from 'react';
import Editor from '../block_list/editor';
import Palette from '../block_list/palette';
import BlockList from '../block_list/block_list';

class WorkStation extends React.Component {
  constructor(props){
    super(props);
    this.handleTick = this.handleTick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.state = {
      category: 'motion'
    };
  }

  componentDidUpdate(prevProps, prevState) {
    this.stage.addChild(this.editor.panel);
    this.stage.update();
  }

  componentWillReceiveProps(newProps) {
    if(newProps.blockData !== this.props.blockData){
      this.handleClear();
      // this.palette.setupBlocks(newProps.blockData);

    }
  }
  componentDidMount() {
  let editorData = {
    x: 110,
    width: 480,
    height: 620
  };

    this.stage = new createjs.Stage("workstationCanvas");
    createjs.Touch.enable(this.stage);
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

    this.stage.update();
    createjs.Ticker.addEventListener("tick", this.handleTick);
    this.props.updateCode(this.editor.code);
    this.props.setStage({workstation: this.stage});
  }
  handleTick(e){
     this.stage.update();
  }
  handleClear(e){
    this.editor.clearBlocks();
    this.stage.update();
  }

  render(){
    return (
      <div className="workstation">
        <button onClick={this.handleClear}>Clear</button>
        <canvas id="workstationCanvas" width="700px" height="700px">
        </canvas>
      </div>
    );

  }
}


export default WorkStation;
