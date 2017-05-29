import Panel from './panel';

class EditorPanel extends Panel {
  constructor(height, width, x) {
    super(height, width);
    this.x = x;
    this.queue = new createjs.LoadQueue(true);
    this.queue.loadFile({
              "src": "images/palettebackground.jpg",
              "type": "image",
              "id": "paletteBackground" });
    this.addBackground = this.addBackground.bind(this);
    this.queue.on("complete", this.addBackground);
    let child = this.setHitArea("black", "white")
    child.alpha = .2;
    this.addChild(child);
    this.setBounds(this.x, this.y, this.width, this.height);
  }

  static alignBlock(block, panelWidth, panelX){
    block.x = panelX + (panelWidth - block.width)/ 2;
  }

  addBackground(){
    // debugger
    // let bg = this.queue.getResult("paletteBackground");
    // this.bg = new createjs.Bitmap(bg);
    // this.bg.scaleX = 0.2;
    // this.bg.scaleY = 0.2;
    // let bounds = this.bg.getTransformedBounds();
    // this.bg.regX = bounds.x - (bounds.width/2);
    // this.bg.regY = bounds.y - (bounds.height/2);
    //
    // this.bg.rotation = 90;
    // this.x = 450;
    // this.y = -60;
    //
    // // this.addChild(this.bg);
    // this.bg.alpha = 0.3
  }
}


export default EditorPanel;
