export const generateEditor = (stage) => {
  let editorContainer = new createjs.Container();
  let editorBox = new createjs.Shape();
  editorBox.graphics.beginStroke("white").beginFill("#C2C0C0").drawRect(200, 5, 400, 290);
  editorContainer.setBounds(150, 0, 150, stage.height);
  editorContainer.addChild(editorBox);
  return editorContainer;
}
