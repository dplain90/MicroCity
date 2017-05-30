class Panel extends createjs.Container {
  constructor(height, width) {
    super();
    this.height = height;
    this.width = width;
    this.setHitArea = this.setHitArea.bind(this);
  }

  setHitArea(color, fill){
    this.hitArea = new createjs.Shape();
    this.hitArea.graphics.beginStroke(color).beginFill(fill).drawRect(this.x, this.y, this.width, this.height);

    return this.hitArea.clone();
  }


}

export default createjs.promote(Panel, "Container");
