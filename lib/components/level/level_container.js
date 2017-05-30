import { connect } from 'react-redux';
import Level from './level';
import { updateToggle } from '../../actions/toggle_actions';
import { updateLevel, getLevels } from '../../actions/level_actions';
const mapStateToProps = (state, ownProps) => ({
  level: state.level,
  toggles: state.toggles
});

const mapDispatchToProps = dispatch => ({
  getLevels: () => dispatch(getLevels()),
  updateLevel: (level) => dispatch(updateLevel(level)),
  updateToggle: (toggle) => dispatch(updateToggle(toggle))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Level);
