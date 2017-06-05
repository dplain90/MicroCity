import ParentNode from '../parent_node';

class Condition extends ParentNode {
  constructor(data){
    super(data);
    this.removeAllEventListeners("pressmove");

    let input = document.createElement(data.inputType);
    let workstation = document.getElementsByClassName("workstation")[0];
    input.style.width = "53px";
    input.style.height = "5px";
    input.style.position = "absolute";
    input.style.top = 0;
    input.style.left = 0;
    workstation.appendChild(input);
    this.removeDOM = this.removeDOM.bind(this);
    this.hide = this.hide.bind(this);
    this.unhide = this.unhide.bind(this);
    this.dom = input;
    this.domEl = new createjs.DOMElement(input);

    // this.domEl.x = ((this.width / 2) / 2) + 3 - 32;
    // this.domEl.y = ((this.height / 2) / 2) + 41;
    // this.domeEl.x = 300;
    // this.domEl.y = 0;
    this.domEl.x = -this.width - (this.width/2);
    // x: 60,
    // width: 480,
    // height: 600
    this.removeChildAt(1);
    // this.domEl.y = this.domEl.y - (this.height / 2) - 7;
    this.addChild(this.domEl);

    this.calibrateHeight = this.calibrateHeight.bind(this);
  }



  calibrateHeight(i){
    this.domEl.y = this.y + (this.height / 4) - (i*15.5)
  }
}
export default Condition;
