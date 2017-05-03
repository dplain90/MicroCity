
import React from 'react';
import { withRouter } from 'react-router';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
    };
  }

  handleClick(e) {
    e.preventDefault();
    this.props.router.push(`/game/${e.target.value}`);
  }

  render(){
    return (
      <div className="chooseLevel">
        <h2> Choose your difficulty: </h2>
        <button onClick={handleClick} value="easy"> Easy </button>
        <button onClick={handleClick} value="medium"> Medium </button>
        <button onClick={handleClick} value="hard"> Hard </button>
      </div>
    );
  }

export default withRouter(Game);
