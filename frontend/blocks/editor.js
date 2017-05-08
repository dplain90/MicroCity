import { BlockSet } from './block';
import Code from './code';
class Editor {
  constructor(editorContainer, code) {
    this.editor = editorContainer;
    this.set = new BlockSet([], 20, 100, 0,
      code);
    this.onEditor = this.onEditor.bind(this);
    this.code = code;
    this.addBlock = this.addBlock.bind(this);
  }

  onEditor(blk) {
    let editorBounds = this.editor.getBounds();
    let farX = editorBounds.x + 200;
    let nearX = editorBounds.x;
    let topY = editorBounds.y;
    let bottomY = editorBounds.y + 600;
    let blkX = blk.x;
    let blkY = blk.y;
    return (blkX > nearX && blkX < farX && blkY > topY && blkY < bottomY);
  }

  addBlock(fnName) {
    let newBlk = this.set.addBlock(fnName);
    newBlk.block_id = newBlk.container.id;
    this.editor.addChild(newBlk.container);
    this.code.blocks.push(newBlk);
    return newBlk;
  }

  removeBlock(blk) {
    if(this.editor.contains(blk)) {
      this.editor.removeChild(blk);
      this.code.removeBlock(blk.id);
    }

  }

  static createEditor(stage) {
    this.editor = new createjs.Container();
    let editorBox = new createjs.Shape();
    editorBox.graphics.beginStroke("white").beginFill("#C2C0C0").drawRect(200, 5, 300, 290);
    this.editor.setBounds(150, 0, 150, stage.height);
    this.editor.addChild(editorBox);
    return this.editor;
  }
}
// }
// export const calcNextBlockPos = (container) => {
//   let children = container.children;
//   let blockCount = children.length - 1;
//   let newY = (blockCount * 20);
//   return { x: 210, y: newY };
// }
export default Editor;
