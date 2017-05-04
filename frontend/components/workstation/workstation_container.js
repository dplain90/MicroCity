import { connect } from 'react-redux';
import WorkStation from './workstation';
import { updateToggle } from '../../actions/toggle_actions';
import { updateCode } from '../../actions/code_actions';
const mapStateToProps = (state, ownProps) => ({
  toggles: state.toggles,
  code: state.code
});

const mapDispatchToProps = dispatch => ({
  updateToggle: (toggle) => dispatch(updateToggle(toggle)),
  updateCode: (code) => dispatch(updateCode(code))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkStation);
