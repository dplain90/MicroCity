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
    this.generateBlock = this.generateBlock.bind(this);
    this.generateBasicBlock = this.generateBasicBlock.bind(this);
    this.state = {
      runStatus: false,
      code: this.props.code
    }

  }

  generateBlock(x,y){
    let block = new createjs.Shape();
    let max = 4;
    block.graphics.beginStroke("red").beginFill("black")
    .moveTo(x, y)
    .lineTo(x-15, y) //top left to start of downward bezel
    .arcTo(x-15, y+8, x-15, y+8-4, 4)
    .arcTo(x-35, y+8, x-35, y+8-4, 4)
    .arcTo(x-35, y, x-35, y+4, 4)
    .lineTo(x-50, y)
    .arcTo(x-50, y+8, x-50, y+8-4, 4)
    .lineTo(x-50, y+48)
    .arcTo(x-35, y+48, x-35, y+52, 4)
    .arcTo(x-35, y+48+8, x-35, y+48-4, 4)
    .arcTo(x-15, y+48+8, x-15, y+48-4, 4)
    .arcTo(x-15, y+48, x-15, y+52, 4)
    .lineTo(x+31, y+48)
    .arcTo(x+31, y+40, x+31, y+44, 4)
    .lineTo(x+31, y+30)
    .arcTo(x+23, y+30, x+19, y+30, 4)
    .lineTo(x-15, y+30)
    .arcTo(x-15, y+38, x-15, y+38-4, 4)

    .arcTo(x-35, y+38, x-35, y+38-4, 4)

    .arcTo(x-35, y+30, x-35, y+34, 4)
      // im here
    .lineTo(x-35, y+22)
    .lineTo(x+31, y+22)
    .arcTo(x+31, y+14, x+31, y+18, 4)
    .lineTo(x+31, y)
    .lineTo(x-15, y)








    // .arcTo(x-, y+48+8, x-35, y+48-4, 4)
    // .arcTo(x-35, y+48+8, x-35, y+52+4, 4)


// x+w+rTR*mTR, y-rTR*mTR, x+w, y+rTR, rTR

    // .endStroke().beginStroke;
    // .arcTo(x+50, y, x+60, y+5, 5);
// bezel: { w: 20, h: 8 },
    // 85px by 22px

    // curve down is +10 px to center. 4px y down.
// 5 y 20 x



    // .arc(x+100, y, 20, 0, Math.PI, true).arcTo(x+140, y, x+180, y-60, 30).arcTo(x+180, y-60, x+220, y, 30).endStroke();
    //
    return block;
  }


  generateBasicBlock(x,y) {
    let insideBlock = new createjs.Shape();
      insideBlock.graphics.moveTo(x-16, y+29).beginStroke("blue").beginFill("white")
      .arcTo(x-16, y+37, x-16, y+37-4, 4)
      .arcTo(x-34, y+37, x-34, y+37-4, 4)
      .arcTo(x-34, y+29, x-34, y+33, 4)
      .lineTo(x-34, y+11) // adding 10 to it
      .lineTo(x+21, y+11) // taking 10 off of the X
      .lineTo(x+21, y+29)
      .lineTo(x-16, y+29);

    return insideBlock;
  }

  //
  // calcCorners(w, h, rTL, rTR, rBR, rBL){
  //   let max = (w<h?w:h)/2;
  //   if (rTL < 0) { rTL *= (mTL=-1); }
  //   if (rTL > max) { rTL = max; }
  //   if (rTR < 0) { rTR *= (mTR=-1); }
  //   if (rTR > max) { rTR = max; }
  //   if (rBR < 0) { rBR *= (mBR=-1); }
  //   if (rBR > max) { rBR = max; }
  //   if (rBL < 0) { rBL *= (mBL=-1); }
  //   if (rBL > max) { rBL = max; }
  //   return { rTL, rTR, rBR, rBL };
  // }
  //
  //
  // const blockDimensions = {
  //   bottomBlock: { w: 54, h: 18 },
  //   bezel: { w: 20, h: 8 },
  //   bottomLeftBlock: { w: 15, h:18 },
  //   connector: { w: 15, h: 10 },
  //   topLeftBlock: { w: 15, h: 21},
  //   topBezelConnector: { w: 20, h: 11 }
  //   innerBezel: { w: 20, h:21 }
  //   topBlock: { w: 34, h: 21 }
  // }
  //
  // createRoundRectShape(){
  //   customRoundRectangle(x, y, w, h, shape);
  //   // bottomBlock
  //   .moveTo(...topRightLine)
  //   .arcTo(...topRightCorner)
  //   .lineTo(...bottomRightLine)
  //   .arcTo(...bottomRightCorner)
  //   .lineTo(...bottomLeftCorner)
  //   // bezel
  //   .endStroke()
  //   .moveTo(x, y)
  //   .beginStroke()
  //   .lineTo(...topRightLine)
  //   .endStroke()
  //   .moveTo(...bottomRightLine)
  //   .startStroke()
  //   .arcTo(...bottomRightCorner)
  //   .lineTo(...bottomLeftLine)
  //   .arcTo(...bottomLeftCorner)
  //   //
  //   //
  //   // .
  //   // ctx.arcTo(x-rTL*mTL, y-rTL*mTL, x+rTL, y, rTL);
  //   //
  //   // ctx.moveTo(x+w-rTR, y);
	// 	// ctx.arcTo(x+w+rTR*mTR, y-rTR*mTR, x+w, y+rTR, rTR);
	// 	// ctx.lineTo(x+w, y+h-rBR);
	// 	// ctx.arcTo(x+w+rBR*mBR, y+h+rBR*mBR, x+w-rBR, y+h, rBR);
	// 	// ctx.lineTo(x+rBL, y+h);
	// 	// ctx.arcTo(x-rBL*mBL, y+h+rBL*mBL, x, y+h-rBL, rBL);
	// 	// ctx.lineTo(x, y+rTL);
	// 	// //
	// 	// ctx.closePath();
	// 	// ctx.closePath();
  //
  // }
  //
  // customRoundRectangle(x, y, w, h, shape) {
	// 	let mTL=0, mTR=0, mBR=0, mBL=0;
	// 	let rTL = 5, rTR = 5, rBR = 5, rBL = 5;
  //
  //   return {
  //     topRightCorner: [ x+w+rTR*mTR, y-rTR*mTR, x+w, y+rTR, rTR ],
  //     topRightLine: [x+w-rTR, y],
  //     bottomRightCorner: [ x+w+rBR*mBR, y+h+rBR*mBR, x+w-rBR, y+h, rBR ],
  //     bottomRightLine: [x+w, y+h-rBR],
  //     bottomLeftCorner: [x-rBL*mBL, y+h+rBL*mBL, x, y+h-rBL, rBL],
  //     bottomLeftLine: [x+rBL, y+h],
  //     topLeftCorner: [x-rTL*mTL, y-rTL*mTL, x+rTL, y, rTL],
  //     topLeftLine: [x, y+rTL]
  //   }
  //
  //
	// };



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
    this.key.scaleX = .25;
    this.key.scaleY = .25;
    this.code = new Code(this.stage, this.robot);
    this.robot.scaleX = .25;
    this.robot.scaleY = .25;
    let blockTest = this.generateBlock(190, 150);
    this.stage.addChild(blockTest);
    this.generateTiles();


    this.stage.addChild(this.avatar, this.key, this.generateBasicBlock(190, 150));
    this.stage.update();


     createjs.Ticker.addEventListener("tick", this.handleTick);
     createjs.Ticker.setInterval(10);
     createjs.Ticker.setFPS(50);
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

    // console.log(this.avatar.hitTest(150,170));
    let distanceFromKey = this.avatar.localToLocal(0, 0, this.key)
    if(distanceFromKey.x === 0){
      let winText = new createjs.Text("LEVEL COMPLETED!", "20px Arial", "#ff7700");
      this.stage.addChild(winText);
      this.stage.update();
    }

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
