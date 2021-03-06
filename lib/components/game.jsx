
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
          <h2> Welcome! </h2>
          <p> Micro City is an interactive programming game, for students ages 10-13. Click the button below to give it a try. </p>
          <button onClick={this.handleClick} value="easy"> Play Now! </button>
        </div>

      </div>
    );
  }
}
export default withRouter(Game);
