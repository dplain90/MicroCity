
export const populateBlocks = (stage, obj, category) => {
  const blockNames = {
    'motion': ['steps', 'move', 'jump']
  }
  let names = blockNames[category];
  let generatedBlocks = names.map( (name, idx) => {
    return generateBlock(name, stage, 30*idx);
  });
  return generatedBlocks;
};

const generateBlock = (name, stage, y) => {
  let block = new createjs.Bitmap(`images/blocks/motion/${name}.png`);
  let blockContainer = new createjs.Container();
  blockContainer.y = y;
  blockContainer.fnName = name;
  blockContainer.addChild(block);


  return blockContainer;
}
