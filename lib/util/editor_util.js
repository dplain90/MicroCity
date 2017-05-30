export const generateEditor = (stage) => {
  let editorContainer = new createjs.Container();
  let editorBox = new createjs.Shape();
  editorBox.graphics.beginStroke("white").beginFill("#C2C0C0").drawRect(200, 5, 400, 290);
  editorContainer.setBounds(150, 0, 150, stage.height);
  editorContainer.addChild(editorBox);
  return editorContainer;
}

export const onEditor = (blk, editor) => {
  let editorBounds = editor.getBounds().clone();
  let farX = editorBounds.x + 200;
  let nearX = editorBounds.x;
  let topY = editorBounds.y;
  let bottomY = editorBounds.y + 600;
  let blkX = blk.x;
  let blkY = blk.y;

};
