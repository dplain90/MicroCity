import { connect } from 'react-redux';
import Grid from './grid';
import { resetGrid } from '../../actions/grid_actions';
import { levelCompleted } from '../../actions/level_actions';
import { updateToggle } from '../../actions/toggle_actions';
import { asArray } from '../../reducers/selectors';
import { setStage } from '../../actions/stage_actions';
const mapStateToProps = (state, ownProps) => {
  return {
  toggles: state.toggles,
  levelData: state.level.levelData,
  level: state.level,
  code: state.code,
  difficulty: state.difficulty };
};

const mapDispatchToProps = dispatch => ({
  resetGrid: () => dispatch(resetGrid()),
  levelCompleted: (level) => dispatch(levelCompleted(level)),
  updateToggle: (toggle) => dispatch(updateToggle(toggle)),
  setStage: (stage) => dispatch(setStage(stage))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);
