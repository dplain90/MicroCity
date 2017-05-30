export const addPlusButton = function() {
  let { x, y, width, height } = this.getTransformedBounds();

  let start = { x: width - 15, y: 15 };

  this.plusContainer = new createjs.Container();
  this.plus = new createjs.Shape();
  let loopButton = new createjs.Shape();
  loopButton.graphics
    .setStrokeStyle(1.5)
    .beginStroke("#1d2b34")
    .beginFill("#6A7F8D")
    .drawCircle(start.x, start.y, 5);
    // this.plus.regX = this.plus.regY = 0.5
    // loopButton.regX = loopButton.regY = 0.5
    this.plus.graphics
      .setStrokeStyle(1)
      .beginStroke("#1d2b34")
      .moveTo(start.x, start.y - 2.5)
      .lineTo(start.x, start.y + 2.5)
      .setStrokeStyle(1)
      .moveTo(start.x + 2.5, start.y)
      .lineTo(start.x - 2.5, start.y);

      // .moveTo(start.x + 1, start.y + 6)
      // .lineTo(start.x + 11, start.y + 6);

    this.plusContainer.addChild(loopButton, this.plus);
    this.addChild(this.plusContainer);
    this.plus.alpha = 1;
    this.stage.update();
};
