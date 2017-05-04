import React from 'react';
// import { Code, Motion } from '../../../util/code_block_util';
import Motion from '../../blocks/motion';

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
    createjs.Ticker.addEventListener("tick", this.handleTick);
  }

  handleTick(event){
     this.robot.scaleX = .25;
     this.robot.scaleY = .25;
    let exampleBlock = [{ fn: this.motion.steps, args: [3] }, { fn: this.motion.move, args: ['y', 10] }];

     debugger
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
