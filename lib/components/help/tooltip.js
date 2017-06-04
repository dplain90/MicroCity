class ToolTip extends createjs.Container {
  constructor(data){
    super();
    let {x, y, content, height, width, rotation} = data;
    this.x = x;
    this.y = y;
    this.makeText = this.makeText.bind(this);
    this.makeArrow = this.makeArrow.bind(this);
    this.makeText(content, height, width);
  }



  makeArrow(){
    let arrowHead = new createjs.Shape();
    let arrowBody = new createjs.Shape();
  }

  makeText(content, height, width){
    let textContent = new createjs.Text(content, "20px Arial", "black");
    let textBg = new createjs.Shape();
    textBg.graphics.beginStroke("black").beginFill("white").rr(20, 0, 90, 90, 10);
    this.addChild(textBg, textContent);
  }
}

export default createjs.promote(ToolTip, "Container");
