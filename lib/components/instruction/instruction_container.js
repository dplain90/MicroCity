import { connect } from 'react-redux';
import Instruction from './instruction';
import { updateToggle } from '../../actions/toggle_actions';
import { updateInstruction } from '../../actions/instruction_actions';
const mapStateToProps = (state, ownProps) => ({
  level: state.level,
  toggles: state.toggles,
  instruction: state.instruction,
  stages: state.stages
});

const mapDispatchToProps = dispatch => ({
  updateToggle: (toggle) => dispatch(updateToggle(toggle)),
  updateInstruction: (instruction) => dispatch(updateInstruction(instruction))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Instruction);
