import { connect } from 'react-redux';
import Editor from './editor';

const mapStateToProps = (state, ownProps) => ({
  code: state.code,
  paletteType: state.toggle.paletteType
});

const mapDispatchToProps = dispatch => ({
  updateCode: (code) => dispatch(updateCode(code)),
  clearCode: () => dispatch(clearCode())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
