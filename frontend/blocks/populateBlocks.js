


export const populateBlocks = (stage, obj) => {

  let motionBlocks = [generateBlock("move", stage, 5), generateBlock("steps", stage, 40) ];

  return motionBlocks;
};

const generateBlock = (name, stage, y) => {
  let label = new createjs.Text(name, "14px Arial", "#fff");
  let block = new createjs.Shape();

  block.graphics.setStrokeStyle(2).beginStroke("black").beginFill("#FFF").drawRoundRect(15, y, 50, 50, 0.5, 0.5, 0.5, 0.5);

  let blockContainer = new createjs.Container();
  blockContainer.y = y;
  blockContainer.fnName = name;
  blockContainer.addChild(block);


  blockContainer.setBounds(15 , y, 50, 50);


  return blockContainer;
}


const dragCallback = (e) => {


};
