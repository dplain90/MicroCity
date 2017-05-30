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
    this.domEl.x += 5;
  }

  addListener(){
    this.domEl.htmlElement.oninput = this.handleChange;
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
    let val = e.currentTarget.value;
    if(val === "") val = "0";
    this.parent.updateParams([parseInt(e.currentTarget.value), 0]);
  }
}

export default TextInput;
