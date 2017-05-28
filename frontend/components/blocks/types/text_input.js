import Condition from './condition';
class TextInput extends Condition {
  constructor(data){
    super(data);
    this.addListener = this.addListener.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addListener();
  }

  addListener(){
    this.domEl.htmlElement.onchange = this.handleChange;
  }

  handleChange(e){
    this.parent.updateParams([parseInt(e.currentTarget.value), 0]);
  }
}

export default TextInput;
