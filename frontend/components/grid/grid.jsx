import React from 'react';
// import { Code, Motion } from '../../../util/code_block_util';
import Code from '../../blocks/code';


class Grid extends React.Component {
  constructor(props){
    super(props);
    this.runButton = this.runButton.bind(this);
    this.handleRun = this.handleRun.bind(this);
    this.handleTick = this.handleTick.bind(this);
    this.moveHorizontal = this.moveHorizontal.bind(this);
    this.moveVertical = this.moveVertical.bind(this);
    this.my_snippets = [ this.moveHorizontal(10), this.moveHorizontal(30), this.moveVertical(10), this.moveVertical(20)];

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
    this.code = new Code(this.stage, this.robot);
    this.robot.scaleX = .25;
    this.robot.scaleY = .25;
    this.stage.addChild(this.robot);
    this.stage.update();
     createjs.Ticker.addEventListener("tick", this.handleTick);
  }

  handleRun(e) {
    e.preventDefault();
    this.code.run(this.state.code);
    this.stage.update();
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

    // let exampleBlock = [{ fn: this.motion.steps, args: [3] }, { fn: this.motion.move, args: ['y', 10] }];
    //
    //
    //  this.motion.run(exampleBlock);
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
        { this.runButton() }
        <canvas id="gridCanvas" width="500px" height="500px">

        </canvas>

      </div>
    );

  }
}
export default Grid;
