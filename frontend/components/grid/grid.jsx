import React from 'react';
import Code from '../../blocks/code';

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
    this.robot = new createjs.Bitmap("/images/robot.png");
    this.code = new Code(this.stage, this.robot);
    this.robot.scaleX = .25;
    this.robot.scaleY = .25;
    this.stage.addChild(this.robot);
    this.stage.update();
     createjs.Ticker.addEventListener("tick", this.handleTick);
     createjs.Ticker.setInterval(25);
     createjs.Ticker.setFPS(100);
  }

  handleRun(e) {
    e.preventDefault();
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

    if(this.queue.length > 0){
      let movement = this.queue.shift();
      if(movement[0] === 'x'){
        this.robot.x += movement[1];
      } else {
        this.robot.y += movement[1];
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
