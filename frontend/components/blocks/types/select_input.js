import Condition from './condition';
class SelectInput extends Condition {
  constructor(data){
    super(data);
    this.addOptions = this.addOptions.bind(this);
    this.addOptions(data.selectOptions);
    this.addListener = this.addListener.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.unhide = this.unhide.bind(this);
    this.removeDOM = this.removeDOM.bind(this);
    this.addListener();
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

  addOptions(options){
    for (var i = 0; i < options.length; i++) {
      let htmlEl = document.createElement('option');
      htmlEl.setAttribute('value', options[i].value);
      htmlEl.textContent = options[i].text;
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
