import { connect } from 'react-redux';
import WorkStation from './workstation';
import { updateToggle } from '../../actions/toggle_actions';
const mapStateToProps = (state, ownProps) => ({
  toggles: state.toggles
});

const mapDispatchToProps = dispatch => ({
  updateToggle: (toggle) => dispatch(updateToggle(toggle))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkStation);
