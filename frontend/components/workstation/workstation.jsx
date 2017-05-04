import React from 'react';
import PaletteContainer from './palette/palette_container';
import EditorContainer from './editor/editor_container';
import { populateBlocks } from '../../blocks/populateBlocks';
class WorkStation extends React.Component {
  constructor(props){
    super(props);
      this.dragCallback = this.dragCallback.bind(this);
      this.populatePalette = this.populatePalette.bind(this);

      this.generateEditor = this.generateEditor.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleTick = this.handleTick.bind(this);
  }

  componentDidMount() {
    this.stage = new createjs.Stage("workstationCanvas");

    this.blocks = populateBlocks(this.stage, this.robot);
    this.moveBlock = this.blocks[0];
    // this.stepsBlock = this.blocks[1];
    // this.robot = new createjs.Bitmap("/images/robot.png");
    // this.stage.addChild(this.robot);
    // this.populatePalette();

    this.moveBlock.on("pressmove", this.dragCallback);
    this.stage.addChild(this.moveBlock,  this.editor);
    console.log(this.moveBlock.hasEventListener());
    debugger
// this.stepsBlock,
    // createjs.Ticker.addEventListener("tick", this.handleTick );
    this.stage.update();
  }

  handleTick(event){
    //  this.robot.scaleX = .25;
    //  this.robot.scaleY = .25;
    //  this.robot.x += 10;
    //  this.robot.y += 10;
     this.stage.update();
  }


  populatePalette() {


    this.workstationContainer = new createjs.Container();
    this.workstationContainer.setBounds(0,0, this.stage.width, this.stage.height);
    this.generateEditor();
    this.workstationContainer.addChild(this.moveBlock, this.stepsBlock);

  }


  dragCallback(e){
    console.log('called');
    e.currentTarget.x = e.stageX;
    e.currentTarget.y = e.stageY;
    this.stage.update();
  }

  generateEditor(){
    this.editorContainer = new createjs.Container();
    this.editorBox = new createjs.Shape();
    this.editorBox.graphics.beginStroke("black").drawRect(5, 5, 100, 80);
    this.editorContainer.setBounds(150, 0, 150, this.stage.height);
    this.editorContainer.addChild(this.editorBox);
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

        </canvas>
      </div>
    );

  }
}

{/* <div className="paletteContainer">
  <button className="togglePalette" onClick={this.handleClick}> Switch </button>
</div>
<EditorContainer /> */}


export default WorkStation;
