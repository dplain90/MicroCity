import Panel from './panel';

class EditorPanel extends Panel {
  constructor(height, width, x) {
    super(height, width);
    this.x = x;
    
    let child = this.setHitArea("black", "white")
    child.alpha = .2;
    this.addChild(child);
    this.setBounds(this.x, this.y, this.width, this.height);
  }

  static alignBlock(block, panelWidth, panelX){
    block.x = panelX + (panelWidth - block.width)/ 2;
  }

}


export default EditorPanel;
