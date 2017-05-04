import Motion from './motion';
import { generateSnippet } from './snippet';

export const populateBlocks = (stage, obj) => {
  let motion = new Motion(stage, obj);
  let motionBlocks = [generateBlock(generateSnippet(motion.move), stage, 5)];

  return motionBlocks;
};

const generateBlock = (snippet, stage, y) => {
  let label = new createjs.Text(snippet.name, "14px Arial", "#fff");
  let block = new createjs.Shape();

  block.graphics.setStrokeStyle(2).beginStroke("black").beginFill("#FFF").drawRoundRect(15, y, 50, 50, 0.5, 0.5, 0.5, 0.5);

  let blockContainer = new createjs.Container();
  blockContainer.x = blockContainer.y = 50;
  blockContainer.width = 50;
  blockContainer.height = 50;
  blockContainer.addChild(block);
  blockContainer.hitArea = block;

  blockContainer.setBounds(15 , y, 50, 50);


  return blockContainer;
}


const dragCallback = (e) => {


};
