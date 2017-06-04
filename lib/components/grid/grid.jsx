import React from 'react';
import LevelGenerator from '../level/level_generator';

class Grid extends React.Component {
  constructor(props){
    super(props);
    this.queue = [];
    this.runButton = this.runButton.bind(this);
    this.handleRun = this.handleRun.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.nextLevelButton = this.nextLevelButton.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.handleStatus = this.handleStatus.bind(this);

    this.state = {
      disabled: false,
      runStatus: false,
      code: this.props.code,
      completed: false,
      number: 1,
      level: {
        number: 1
      }
    }

  }

  componentWillReceiveProps(newProps) {
    if(newProps.code !== this.props.code) {
      this.setState({code: newProps.code});
    }

    if(newProps.level !== this.props.level) {
      this.setState({completed: false});
      this.stage.removeAllChildren();
      this.level = new LevelGenerator(newProps.levelData, this.stage);
    }
  }
  componentDidMount() {
    this.stage = new createjs.Stage("gridCanvas");
    this.level = new LevelGenerator(this.props.levelData, this.stage);
    this.stage.update();

    window.grid = this.stage;
     createjs.Ticker.addEventListener("tick", this.handleTick);
     createjs.Ticker.setInterval(10);
     createjs.Ticker.setFPS(50);
     this.props.setStage({grid: this.stage});
  }

  handleRun(e) {
    e.preventDefault();
    this.queue = this.state.code.getQueue(this.level);
  }

  nextLevel(e) {
    e.preventDefault();
    this.props.levelCompleted(this.state.number);
  }

  runButton(){
    let {runStatus, disabled} = this.state;
    if(disabled) {
      return (
        <button className="runningCode" disabled></button>
      );
    } else {
      return (
        <button className="runCode" onClick={this.handleRun}> Run </button>
      );
    }
  }

  nextLevelButton(){
    if(this.state.completed) {
    return (
      <button className="levelCompleted" id="levelCompleted" onClick={this.nextLevel} > Next Level
      </button>
      );
    }
  }

  handleStatus({status}) {
    switch(status){
      case 'ongoing':
        break;
      case 'won':
        this.setState({completed: true});
        break;
      case 'lost':
        this.setState({disabled: true});
        break;
    }
  }


  handleTick(event){
// if (this.queue.length > 0) this.setState({ code: [] });
    if(this.queue.length > 0) {
      let frame = this.queue.pop();
      let status = this.level.handleTick(frame);
      this.handleStatus(status);
      if(this.queue.length === 0) {
        this.level.idle();
        this.level.history = [];
    }

    this.stage.update();
  }
}

  handleReset(){
    this.setState({completed: false, disabled: false});
    this.queue = [];
    this.level.reset();
    this.stage.update();
  }

  render(){
    let number = this.props.level.number
    let nextLevelButton = this.nextLevelButton();
    let runButton = this.runButton();
    return (
      <div className="grid">
        <button id="reset" onClick={this.handleReset}>Reset</button>
        { runButton }
        { nextLevelButton }
        <h2> {number} </h2>
        <canvas id="gridCanvas" width="500px" height="500px">

        </canvas>

      </div>
    );

  }
}
export default Grid;


// let myAvatar = this.level.avatar;
// if(myAvatar.win){
//    myAvatar.isReset = true;
//    let winText = new createjs.Text("LEVEL COMPLETED!", "20px Arial", "#ff7700");
//    this.stage.addChild(winText);
// }
//
// if(myAvatar.isReset){
//   myAvatar.obj.gotoAndStop('idle');
// }
//
//   if(this.queue.length === 0) {
//     myAvatar.handleTick({x: 0, y: 0});
//     myAvatar.obj.gotoAndStop('idle');
//
//   } else {
//     myAvatar.isReset = false;
//     let movement = this.queue.shift();
//     if(movement['animation'] !== undefined) {
//       myAvatar.handleAnimation(movement.animation);
//       myAvatar.obj.gotoAndPlay(movement.animation);
//     } else {
//       myAvatar.handleTick(movement);
//     }
//   }
