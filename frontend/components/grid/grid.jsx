import React from 'react';
// import { Code, Motion } from '../../../util/code_block_util';


class Code {
  constructor(stage, obj) {
    this.stage = stage;
    this.obj = obj;

  }

  run(blocks){
    for (let i = 0; i < blocks.length; i++) {
      let { fn, args } = blocks[i]
      debugger
      fn.call(this.obj, ...args);
    }
  }
}

class Motion extends Code {
  constructor(stage, obj){
    super(stage, obj);
    this.steps = this.steps.bind(this);

  }

  steps(num){
    if(num > 0) {
      debugger
      this.obj.x += 10;
      this.stage.update();
      this.steps(num - 1);
    }
  }
}




class Grid extends React.Component {
  constructor(props){
    super(props);
    this.handleTick = this.handleTick.bind(this);
    this.count = 0;
    this.moveHorizontal = this.moveHorizontal.bind(this);
    this.moveVertical = this.moveVertical.bind(this);

    this.my_snippets = [ this.moveHorizontal(10), this.moveHorizontal(30), this.moveVertical(10), this.moveVertical(20)];
  }

  moveHorizontal(dir) {
    return (obj) => {
      return obj.x += dir;
    }
  }

  moveVertical(dir) {
    return (obj) => obj.y += dir;
  }

  componentDidMount() {
    this.stage = new createjs.Stage("gridCanvas");
    this.robot = new createjs.Bitmap("/images/robot.png");

    this.stage.addChild(this.robot);
    this.motion = new Motion(this.stage, this.robot);
    debugger
    createjs.Ticker.addEventListener("tick", this.handleTick);
  }

  handleTick(event){
     this.robot.scaleX = .25;
     this.robot.scaleY = .25;
    let exampleBlock = [{ fn: this.motion.steps, args: [3] }];
     this.motion.run(exampleBlock);
    //  if (!event.paused) {
    //    this.my_snippets.forEach( (snippet) => {
    //      snippet(this.robot);
    //    });
     //
    //    this.count += 1;
    //  }
     //
    //  if(this.count > 10){
    //    createjs.Ticker.paused = true;
    //  }
     this.stage.update();

  }

  render(){
    return (
      <div className="grid">
        <canvas id="gridCanvas" width="500px" height="500px">

        </canvas>

      </div>
    );

  }
}
export default Grid;
