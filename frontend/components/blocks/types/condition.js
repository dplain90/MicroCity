import BasicBlock from './basic.js';
class Condition extends BasicBlock {
  constructor(data){
    super(data);
    this.removeAllEventListeners("pressmove");

    let input = document.createElement(data.inputType);
    let workstation = document.getElementsByClassName("workstation")[0];
    input.style.width = "10px";
    input.style.height = "5px";
    input.style.position = "absolute";
    input.style.top = 0;
    input.style.left = 0;
    workstation.appendChild(input);
    this.dom = input;
    this.domEl = new createjs.DOMElement(input);

    this.domEl.x = ((this.width / 2) / 2) + 3 - 50;
    this.domEl.y = ((this.height / 2) / 2) + 3;

    this.removeChildAt(1);
    // this.domEl.y = this.domEl.y - (this.height / 2) - 7;
    this.addChild(this.domEl);

    this.calibrateHeight = this.calibrateHeight.bind(this);
  }

  calibrateHeight(i){
    this.domEl.y = ((this.height / 2) / 2) + 3 - (10*i) - (i*2);
  }
}
export default Condition;
