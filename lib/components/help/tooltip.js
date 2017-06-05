class ToolTip extends createjs.Container {
  constructor(data){
    super();
    let {x, y, content, height, width, rotation} = data;
    this.x = x;
    this.y = y;
    this.makeText = this.makeText.bind(this);
    this.makeArrow = this.makeArrow.bind(this);
    this.makeArrow(rotation);
    this.makeText(content, height, width);
  }



  makeArrow(rotation){
    let arrowContainer = new createjs.Container();
    let arrowHead = new createjs.Shape();
    arrowHead.graphics.beginStroke("#F4D03F").beginFill("#F4D03F").dp(12, 0, 20, 3, 0);
    let arrowBody = new createjs.Shape();
    arrowHead.rotation = 30;
    arrowBody.graphics.beginStroke("#F4D03F").beginFill("#F4D03F").dr(0, 10, 20, 30);
    arrowContainer.addChild(arrowHead, arrowBody);
    arrowContainer.rotation = rotation;
    this.addChild(arrowContainer);
  }

  makeText(content, height, width){
    let textContent = new createjs.Text(content, "20px Arial", "black");
    textContent.lineWidth = width;
    textContent.x = 25;
    textContent.y = 5;
    let textBg = new createjs.Shape();
    textBg.graphics.beginStroke("black").beginFill("white").rr(20, 0, width, height, 10);

    // this.addChild(textBg, textContent);
  }
}

export default createjs.promote(ToolTip, "Container");
