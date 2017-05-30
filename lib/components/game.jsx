
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
    this.props.router.push(`/${e.target.value}`);
  }

  render(){
    return (
      <div className="gameContainer">
        <div className="chooseLevel">
          <h2> Choose your difficulty: </h2>
          <button onClick={this.handleClick} value="easy"> Easy </button>
          <button onClick={this.handleClick} value="medium"> Medium </button>
          <button onClick={this.handleClick} value="hard"> Hard </button>
        </div>

      </div>
    );
  }
}
export default withRouter(Game);
