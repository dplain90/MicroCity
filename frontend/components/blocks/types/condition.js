import BasicBlock from './basic.js';
class Condition extends BasicBlock {
  constructor(data){
    super(data);
    this.removeAllEventListeners("pressmove");

    let input = document.createElement(data.inputType);
    let workstation = document.getElementsByClassName("workstation")[0];
    workstation.append(input);
    this.domEl = new createjs.DOMElement(input);
    let bounds = this.getTransformedBounds();

    // this.domEl.x = this.domEl.x;
    // this.domEl.y = this.domEl.y - (this.height / 2) - 7;

    this.addChild(this.domEl);
    this.domEl.x = -58;
    this.domEl.y = 15;
    this.removeChildAt(1);
  }


}
export default Condition;
