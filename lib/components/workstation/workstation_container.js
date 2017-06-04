import { connect } from 'react-redux';
import WorkStation from './workstation';
import { updateToggle } from '../../actions/toggle_actions';
import { setStage } from '../../actions/stage_actions';
import { updateCode, removeCode, addArg } from '../../actions/code_actions';
const mapStateToProps = (state, ownProps) => ({
  toggles: state.toggles,
  code: state.code,
  blockData: state.level.blockData
});

const mapDispatchToProps = dispatch => ({
  updateToggle: (toggle) => dispatch(updateToggle(toggle)),
  updateCode: (code) => dispatch(updateCode(code)),
  removeCode: (id) => dispatch(removeCode(id)),
  addArg: (id, arg) => dispatch(addArg(id, arg)),
  setStage: (stage) => dispatch(setStage(stage))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkStation);
