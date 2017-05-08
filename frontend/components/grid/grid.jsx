import React from 'react';
import { Code, CodeEngine } from '../../blocks/code';
import { generateAvatar } from '../../../images/avatar/avatar';
import Tile from '../../../images/tiles';
import { Level, levelData } from '../../blocks/level';

class Grid extends React.Component {
  constructor(props){
    super(props);
    this.queue = [];
    this.runButton = this.runButton.bind(this);
    this.handleRun = this.handleRun.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.generateTiles = this.generateTiles.bind(this);
    this.level = new Level(levelData);
    // this.generateBlock = this.generateBlock.bind(this);

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
    this.avatar = new createjs.Sprite(this.avatarSheet, "idle");
    this.avatar.y = 170;

    this.robot = new createjs.Bitmap("/images/robot.png");
    this.key = new createjs.Bitmap("/images/objects/keyYellow.png");
    this.key.y = 10;
    this.key.x = 150;
    this.key.scaleX = .50;
    this.key.scaleY = .50;
    // this.code = new Code(this.stage, this.robot);
    this.robot.scaleX = 3;
    this.robot.scaleY = 3;
    // let blockTest = this.generateBlock(190, 150, 22+16);
    // this.stage.addChild(blockTest, this.generateBasicBlockTop(190, 150));
    let levelObjs = this.level.createDisplayObjects(levelData);
    for (var i = 0; i < levelObjs.length; i++) {
      if(levelObjs[i] !== undefined) {
        this.stage.addChild(levelObjs[i]);
      }
    }

    let test = Tile.create(200, 50);
    this.stage.addChild(test);
    this.stage.addChild(this.avatar, this.key);
    // this.stage.addChild(this.avatar, this.key, this.generateBasicBlock(190, 150, 10+26));
    // this.stage.update();


     createjs.Ticker.addEventListener("tick", this.handleTick);
     createjs.Ticker.setInterval(10);
     createjs.Ticker.setFPS(50);
  }

  handleRun(e) {
    e.preventDefault();
    this.queue = CodeEngine.run();
  }


  generateTiles(){
    this.tileSheet = generateTileSheet();
    for (var i = 0; i < 9; i++) {
      let tile = new createjs.Sprite(this.tileSheet);
      tile.scaleX = .25;
      tile.scaleY = .25;
      tile.x = (18.5*i);
      tile.y = 200;
      // this.stage.addChild(tile);
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
  let myAvatar = this.level.avatar;
  if(myAvatar.win){
     myAvatar.isReset = true;
     let winText = new createjs.Text("LEVEL COMPLETED!", "20px Arial", "#ff7700");
     this.stage.addChild(winText);
  }

  if(myAvatar.isReset){
    myAvatar.obj.gotoAndStop('idle');
  }

    if(this.queue.length === 0) {
      myAvatar.handleTick({x: 0, y: 0});

    } else {
      myAvatar.isReset = false;
      let movement = this.queue.shift();
      if(movement['animation'] !== undefined) {
        myAvatar.handleAnimation(movement.animation);
        myAvatar.obj.gotoAndPlay(movement.animation);
      } else {
        myAvatar.handleTick(movement);
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
