import React from 'react';
import { getInstruction } from '../../actions/instruction_actions';

class Instruction extends React.Component {
  constructor(props){
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.nextBtn = this.nextBtn.bind(this);
    this.addTips = this.addTips.bind(this);
    this.removeTips = this.removeTips.bind(this);
    this.setupTips = this.setupTips.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.state = {

      nextActive: true,
      tips: this.props.instruction.tips,
      grid: this.props.stages.grid,
      workstation: this.props.stages.workstation
    };

    this.setupTips();
  }

  componentDidUpdate(prevProps, prevState) {
    let { grid, workstation, tips, nextActive } = this.state;
    let { oldGrid, oldWk, oldTips} = prevState;
      if(grid !== oldGrid && workstation !== oldWk && nextActive !== "done"){
        this.setupTips();
      }
      if(tips !== oldTips && nextActive !== "done"){
        this.setupTips();
      }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.level.number !== this.props.level.number){
      this.setState({nextActive: true});
    }

    if(newProps.stages !== this.props.stages){
      let { workstation, grid } = newProps.stages;
      this.setState({grid, workstation});
    }

    let { step_num: newStep } = newProps.instruction;
    let { step_num: oldStep } = this.props.instruction;
    if(newStep !== oldStep) {
      this.setState({tips: newProps.instruction.tips});

    }

  }

  addTips(grid, workstation){
    let { tips } = this.state;
    debugger
    if(tips.stage === "workstation"){
      workstation.addChild(tips.obj);
      workstation.update();
    } else {
      grid.addChild(tips.obj);
      grid.update();
    }
  }

  removeTips(){
    let {tips, grid, workstation} = this.state;
    debugger
    if(tips.stage === "workstation"){
      workstation.removeChild(tips.obj);
      workstation.update();
    } else {
      grid.removeChild(tips.obj);
      grid.update();
    }
  }

  setupTips(grid = this.state.grid, workstation = this.state.workstation ){
    if(grid && workstation && this.state.tips){
      this.addTips(grid, workstation);
    }
  }

  handleNext(e) {
    e.preventDefault();
    let { number: levelNum } = this.props.level;
    let { step_num } = this.props.instruction;
    let nextInstruction = getInstruction(levelNum, step_num + 1);
    if(!getInstruction(levelNum, step_num + 2)){
      this.setState({nextActive: "last"});
    }
    this.removeTips();
    this.props.updateInstruction(nextInstruction);
  }

  handleDone(e) {
    this.removeTips();
    this.setState({nextActive: "done"});
  }

  nextBtn(){
    let { nextActive } = this.state;
    if(nextActive === "done"){
      return "";
    }
    else if (nextActive === "last"){
      return (<button onClick={this.handleDone}>Done</button>);
    }
    else {
      return (<button onClick={this.handleNext}>Next</button>);
    }
  }

  render(){
    let { title, content } = this.props.instruction;
    let next = this.nextBtn();
    return (
        <div className="instruction">

          <h3> {title} </h3>
          <p>
            {content}
          </p>

          { next }
        </div>
    );

  }
}
export default Instruction;
