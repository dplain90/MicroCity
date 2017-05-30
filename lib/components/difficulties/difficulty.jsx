import { connect } from 'react-redux';
import { setDifficulty } from '../../actions/difficulty_actions';
import { getLevels } from '../../actions/level_actions';
import LevelContainer from '../level/level_container';
import WorkStationContainer from '../workstation/workstation_container.js';
import React from 'react';
class Difficulty extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillReceiveProps(newProps) {
    let {level, levels, updateLevel} = this.props;
    if(newProps.level.completed !== level.completed) {
      let newLevel = levels[level.number + 1];
      if (newLevel !== undefined) updateLevel(newLevel);
    }
  }

  componentDidMount(){
    let { getLevels, difficulty } = this.props;
    getLevels(difficulty);
  }

  render(){
    return (
      <div className="levelContainer">
        <LevelContainer />
      </div>
    );
  }
}



const mapStateToProps = (state, ownProps) => ({
  level: state.level,
  levels: state.levels,
  difficulty: ownProps.location.pathname
});

const mapDispatchToProps = dispatch => ({
  getLevels: (difficulty) => dispatch(getLevels(difficulty)),
  updateLevel: (level) => dispatch(updateLevel(level))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Difficulty);
