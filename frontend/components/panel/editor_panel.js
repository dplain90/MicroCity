import Panel from './panel';

class EditorPanel extends Panel {
  constructor(height, width, x) {
    super(height, width);
    this.x = x;
    this.addChild(this.setHitArea("white", "gray"));
  }

}


export default EditorPanel;
