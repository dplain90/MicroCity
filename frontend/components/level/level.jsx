import React from 'react';
import GridContainer from '../grid/grid_container';
import WorkStationContainer from '../workstation/workstation_container';

class Level extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.runButton = this.runButton.bind(this);
    this.state = {
      runStatus: false
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.toggle.run !== this.props.toggle.run) {
      this.setState({runStatus: newProps.toggle.run});
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ runStatus: true });
    this.props.updateToggle({ run: true });
  }

  runButton(){
    let {runStatus} = this.state;
    if(runStatus) {
      return (
        <button className="runningCode" disabled> Running... </button>
      );
    } else {
      return (
        <button className="runCode" onClick={this.handleClick} > Run </button>
      );
    }
  }

  render(){
    let { number, title, description } = this.props.level;

    return (
      <div className="level">
        <div className="levelMenu">
          <h2> Level {number}: {title} </h2>
          <h3> { description } </h3>
          { this.runButton() }
        </div>
        <div className="levelWidget">
          <WorkStationContainer />
          <GridContainer />
        </div>
      </div>
    );

  }
}
export default Level;