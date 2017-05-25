import { connect } from 'react-redux';
import Grid from './grid';
import { resetGrid } from '../../actions/grid_actions';
import { updateLevel } from '../../actions/level_actions';
import { updateToggle } from '../../actions/toggle_actions';
import { asArray } from '../../reducers/selectors';
const mapStateToProps = (state, ownProps) => {
  return {
  toggles: state.toggles,
  level: state.level,
  code: state.code,
  difficulty: state.difficulty };
};

const mapDispatchToProps = dispatch => ({
  resetGrid: () => dispatch(resetGrid()),
  updateLevel: (level) => dispatch(updateLevel(level)),
  updateToggle: (toggle) => dispatch(updateToggle(toggle))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);
