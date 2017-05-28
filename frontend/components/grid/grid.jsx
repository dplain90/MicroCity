import React from 'react';
import { Code, CodeEngine } from '../../blocks/code';
import { generateAvatar } from '../../../images/avatar/avatar';
import Tile from '../../../images/tiles';
import { Level, levelData } from '../../blocks/level';
import LevelGenerator from '../../blocks/level_generator';
import { level1 } from '../../data/levels/level_1';
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

    // this.generateBlock = this.generateBlock.bind(this);

    this.state = {
      runStatus: false,
      code: this.props.code,
      completed: false,
      level: {
        number: 1
      }
    }

  }

  componentWillReceiveProps(newProps) {

    if(newProps.toggles.run !== this.props.toggles.run) {
      this.setState({runStatus: newProps.toggles.run});
    }
    if(newProps.code !== this.props.code) {
      this.setState({code: newProps.code});
    }

    if(newProps.level !== this.props.level) {
      this.stage.removeAllChildren();
      this.level = new LevelGenerator(newProps.level, this.stage);
    }
  }
  componentDidMount() {
    this.stage = new createjs.Stage("gridCanvas");
    // this.level = new Level(this.props.level, level);
    // this.avatarSheet = generateAvatar();
    // this.avatar = new createjs.Sprite(this.avatarSheet, "idle");
    // this.avatar.y = 170;

    // this.robot = new createjs.Bitmap("/images/robot.png");
    // this.key = new createjs.Bitmap("/images/objects/keyYellow.png");
    // this.key.y = 10;
    // this.key.x = 150;
    // this.key.scaleX = .50;
    // this.key.scaleY = .50;
    // // this.code = new Code(this.stage, this.robot);
    // this.robot.scaleX = 3;
    // this.robot.scaleY = 3;
    // let blockTest = this.generateBlock(190, 150, 22+16);
    // this.stage.addChild(blockTest, this.generateBasicBlockTop(190, 150));
    this.level = new LevelGenerator(this.props.levelData, this.stage);


    this.stage.update();

     createjs.Ticker.addEventListener("tick", this.handleTick);
     createjs.Ticker.setInterval(10);
     createjs.Ticker.setFPS(50);
  }

  handleRun(e) {
    e.preventDefault();
    this.queue = this.state.code.getQueue();
    console.log(this.queue);
  }

  nextLevel(e) {
    this.props.completedLevel(this.state.level.number);
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

  nextLevelButton(){
    if(this.state.completed) {
    return (
      <button className="levelCompleted" onClick={this.nextLevel} > Next Level
      </button>
      );
    }
  }
  handleTick(event){
// if (this.queue.length > 0) this.setState({ code: [] });




  this.stage.update();

  }

  handleReset(e){
    e.preventDefault();
    this.queue = [];
    this.level.reset();
  }

  render(){
    return (
      <div className="grid">
        { this.runButton() }
        { this.nextLevelButton() }
        <button onClick={this.handleReset}>Reset</button>
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
