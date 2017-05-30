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
    x: 60,
    width: 380,
    height: 430
  };

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

    window.stage = this.stage;
    this.stage.update();
    createjs.Ticker.addEventListener("tick", this.handleTick);
    this.props.updateCode(this.editor.code);

  }
  handleTick(e){
     this.stage.update();
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