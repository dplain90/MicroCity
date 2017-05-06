import React from 'react';
import Code from '../../blocks/code';
import { generateAvatar } from '../../../images/avatar/avatar';
import { generateTileSheet } from '../../../images/tiles';
class Grid extends React.Component {
  constructor(props){
    super(props);
    this.queue = [];
    this.runButton = this.runButton.bind(this);
    this.handleRun = this.handleRun.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.generateTiles = this.generateTiles.bind(this);
    this.state = {
      runStatus: false,
      code: this.props.code
    }

  }


  componentWillReceiveProps(newProps) {
    debugger
    if(newProps.toggles.run !== this.props.toggles.run) {
      this.setState({runStatus: newProps.toggles.run});
    }
    if(newProps.code !== this.props.code) {
      this.setState({code: newProps.code});
    }
  }

  componentDidMount() {
    this.stage = new createjs.Stage("gridCanvas");
    this.avatarSheet = generateAvatar();
    this.avatar = new createjs.Sprite(this.avatarSheet, "idle");
    this.avatar.y = 170;
    this.robot = new createjs.Bitmap("/images/robot.png");

    this.code = new Code(this.stage, this.robot);
    this.robot.scaleX = .25;
    this.robot.scaleY = .25;

    this.generateTiles();
    this.stage.addChild(this.avatar);
    this.stage.update();


     createjs.Ticker.addEventListener("tick", this.handleTick);
     createjs.Ticker.setInterval(10);
     createjs.Ticker.setFPS(30);
  }

  handleRun(e) {
    e.preventDefault();
    // if(this.state.code !== this.props.code){
    //
    // }
    console.log(this.state.code);
    this.queue = this.code.run(this.state.code);
  }


  generateTiles(){
    this.tileSheet = generateTileSheet();
    for (var i = 0; i < 9; i++) {
      let tile = new createjs.Sprite(this.tileSheet);
      tile.scaleX = .25;
      tile.scaleY = .25;
      tile.x = (18.5*i);
      tile.y = 200;
      this.stage.addChild(tile);
    }
  }

  runButton(){
    let {runStatus} = this.state;
    if(runStatus) {
      return (
        <button className="runningCode" disabled> Running... </button>
      );
    } else {
      return (
        <button className="runCode" onClick={this.handleRun} > Run </button>
      );
    }
  }

  handleTick(event){
// if (this.queue.length > 0) this.setState({ code: [] });

    if(this.queue.length === 0) {
      this.avatar.gotoAndStop('idle');
    } else {
      let movement = this.queue.shift();
      if(movement.length === 1) {
        this.avatar.gotoAndPlay(movement[0]);
      } else {
        if(movement[0] === 'x'){
          this.avatar.x += movement[1];
        } else {
          this.avatar.y += movement[1];
        }
      }
    }




  this.stage.update();

  }

  render(){
    return (
      <div className="grid">
        { this.runButton() }
        <canvas id="gridCanvas" width="500px" height="500px">

        </canvas>

      </div>
    );

  }
}
export default Grid;
