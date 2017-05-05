import React from 'react';
import Code from '../../blocks/code';
import { generateAvatar } from '../../../images/avatar/avatar';
class Grid extends React.Component {
  constructor(props){
    super(props);
    this.queue = [];
    this.runButton = this.runButton.bind(this);
    this.handleRun = this.handleRun.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.state = {
      runStatus: false,
      code: this.props.code
    }

  }


  componentWillReceiveProps(newProps) {
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
    this.avatarRun = new createjs.Sprite(this.avatarSheet, "run");
    this.avatarIdle = new createjs.Sprite(this.avatarSheet, "idle");
    this.robot = new createjs.Bitmap("/images/robot.png");

    this.code = new Code(this.stage, this.robot);
    this.robot.scaleX = .25;
    this.robot.scaleY = .25;
    this.stage.addChild(this.avatarIdle, this.avatarRun);
    this.stage.update();
     createjs.Ticker.addEventListener("tick", this.handleTick);
    //  createjs.Ticker.setInterval(25);
    //  createjs.Ticker.setFPS(100);
  }

  handleRun(e) {
    e.preventDefault();
    // if(this.state.code !== this.props.code){
    //
    // }
    this.queue = this.code.run(this.state.code);
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

    this.avatarIdle.y = 90
    // this.avatarRun.gotoAndPlay("run");
    this.avatarIdle.gotoAndPlay("idle");
    // this.avatarRun.gotoAndStop(14);
    //  this.avatarIdle.gotoAndStop("10");
    if(this.queue.length > 0){
      let movement = this.queue.shift();
      if(movement[0] === 'x'){
        this.robot.x += movement[1];
      } else {
        this.robot.y += movement[1];
      }
      console.log(this.robot.y);
      if (this.queue.length > 0) this.setState({ code: [] });
    } else {
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
