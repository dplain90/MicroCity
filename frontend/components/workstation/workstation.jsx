import React from 'react';
import PaletteContainer from './palette/palette_container';
import EditorContainer from './editor/editor_container';

class WorkStation extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.stage = new createjs.Stage("paletteCanvas");


    this.stage.addChild(this.robot);
    this.motion = new Motion(this.stage, this.robot);
    createjs.Ticker.addEventListener("tick", this.handleTick);
  }

  populatePalette() {
    

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
          <div className="paletteContainer">
            <button className="togglePalette" onClick={this.handleClick}> Switch </button>
          </div>
          <EditorContainer />
        </canvas>
      </div>
    );

  }
}

export default WorkStation;
