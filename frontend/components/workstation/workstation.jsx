import React from 'react';
import PaletteContainer from './palette/palette_container';
import EditorContainer from './editor/editor_container';

class WorkStation extends React.Component {
  constructor(props){
    super(props);
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
        <div className="paletteContainer">
          <button className="togglePalette" onClick={this.handleClick}> Switch </button>
        </div>
        <EditorContainer />
      </div>
    );

  }
}

export default WorkStation;
