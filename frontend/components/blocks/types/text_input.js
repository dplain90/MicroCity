import Condition from './condition';
class TextInput extends Condition {
  constructor(data){
    super(data);
    this.addListener = this.addListener.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeDOM = this.removeDOM.bind(this);
    this.unhide = this.unhide.bind(this);
    this.hide = this.hide.bind(this);
    this.addListener();
  }

  addListener(){
    this.domEl.htmlElement.onchange = this.handleChange;
  }

  removeDOM(){
    this.dom.remove();
  }

  hide() {
    this.visible = false;
  }
  unhide(){
    this.visible = true;
  }

  handleChange(e){
    this.parent.updateParams([parseInt(e.currentTarget.value), 0]);
  }
}

export default TextInput;
