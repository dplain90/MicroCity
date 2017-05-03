class Editor extends React.Component {
  constructor(props){
    super(props);
    this.editorDisplay = this.editorDisplay.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      content: this.props.code.content,
      paletteType: this.props.paletteType
    };
  }

  componentWillReceiveProps(newProps){
    { paletteType, code } = this.props;
    if(paletteType !== newProps.paletteType) {
      this.setState({paletteType: newProps.paletteType});
    }

    if(code.content !== newProps.code.content) {
      this.setState({content: newProps.code.conent});
    }
  }

  editorDisplay(){
    if(this.state.paletteType == "text") {
      return (
        <div className="editor text">
          <textarea className="textEditor" onChange={this.update} value={this.state.content}>
          </textarea>
        </div>
      );
    } else {
      return (
        <div className="editor block">
        </div>
      );
    }
  }

  update(e) {
    e.preventDefault();
    this.props.updateCode({content: e.target.value});
  }

  render(){
    return (
      <div className="palette">
        { editorDisplay() }
      </div>
    );
  }

export default WorkStation;
