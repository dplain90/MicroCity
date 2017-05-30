import Condition from './condition';
class SelectInput extends Condition {
  constructor(data){
    super(data);
    this.options = data.selectOptions;
    this.addOptions = this.addOptions.bind(this);
    this.addOptions();
    this.addListener = this.addListener.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.unhide = this.unhide.bind(this);
    this.removeDOM = this.removeDOM.bind(this);
    this.addListener();
    this.dom.style.width = "30px"
    this.dom.style.height = "10px";

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

  addOptions(){

    for (var i = 0; i < this.options.length; i++) {
      let htmlEl = document.createElement('option');
      htmlEl.setAttribute('value', this.options[i].value);
      htmlEl.textContent = this.options[i].text;
      this.domEl.htmlElement.append(htmlEl);
    }
  }

  addListener(){
    this.domEl.htmlElement.onchange = this.handleChange;
  }

  handleChange(e){
    this.parent.updateParams(e.currentTarget.value);
  }
}

export default SelectInput;
