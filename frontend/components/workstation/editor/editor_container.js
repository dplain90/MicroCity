import { connect } from 'react-redux';
import Editor from './editor';

const mapStateToProps = (state, ownProps) => ({
  code: state.code,
  paletteType: state.toggles.paletteType
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
