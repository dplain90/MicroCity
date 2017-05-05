
export const populateBlocks = (stage, obj, category) => {
  const blockNames = {
    'motion': ['steps', 'move', 'jump']
  }
  let names = blockNames[category];
  let generatedBlocks = names.map( (name, idx) => {
    return generateBlock(name, stage, 10*idx);
  });
  return generatedBlocks;
};

const generateBlock = (name, stage, y) => {
   let block = new createjs.Bitmap(`images/blocks/motion/${name}.png`);
   block.x = 20;
   block.y = y;

  let blockContainer = new createjs.Container();
  blockContainer.y = y;
  blockContainer.fnName = name;
  blockContainer.addChild(block);

  return blockContainer;
}
