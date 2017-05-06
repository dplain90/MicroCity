import Grid from '../components/grid/grid';

export const populateBlocks = (stage, obj, category) => {
  const blockNames = {
    'motion': [
      { name: 'steps', input: true },
      { name: 'move', input: false},
      { name: 'jump', input: false}
    ]
  }
  let blockData = blockNames[category];
  let generatedBlocks = blockData.map( (blockData, idx) => {
    return generateBlock(blockData.name, stage, 30*idx, blockData.input);
  });
  return generatedBlocks;
};

const generateComparator = (x,y) => {
  let comparator = new createjs.Shape();
  comparator.graphics
    .beginStroke("black")
    .beginFill("#FF0")
    .lineTo(x+20, y)
    .lineTo(x+30, y+10)
    .lineTo(x+20, y+20)
    .lineTo(x, y+20)
    .lineTo(x-10, y+10)
    .lineTo(x, y)
    .lineTo(x+20, y);
  return comparator;
};

// export const generateBasicBlock = (x,y) => {
//   let insideBlock = new createjs.Shape();
//     .graphics.moveTo(x-16, y+29).beginStroke("blue").beginFill("white")
//     .arcTo(x-16, y+37, x-16, y+37-4, 4)
//     .arcTo(x-34, y+37, x-34, y+37-4, 4)
//     .arcTo(x-34, y+29, x-34, y+33, 4)
//     .lineTo(x-34, y+11) // adding 10 to it
//     .lineTo(x+21, y+11) // taking 10 off of the X
//     .lineTo(x+21, y+29)
//     .lineTo(x-16, y+29);
//
//   return insideBlock;
// }

const generateConditionalBlock = (x,y) => {
  let block = new createjs.Shape();
  let max = 4;
  block.graphics.beginStroke("red").beginFill("black")
  .moveTo(x, y)
  .lineTo(x-15, y)
  .arcTo(x-15, y+8, x-15, y+8-4, 4)
  .arcTo(x-35, y+8, x-35, y+8-4, 4)
  .arcTo(x-35, y, x-35, y+4, 4)
  .lineTo(x-50, y)
  .arcTo(x-50, y+8, x-50, y+8-4, 4)
  .lineTo(x-50, y+48)
  .arcTo(x-35, y+48, x-35, y+52, 4)
  .arcTo(x-35, y+48+8, x-35, y+48-4, 4)
  .arcTo(x-15, y+48+8, x-15, y+48-4, 4)
  .arcTo(x-15, y+48, x-15, y+52, 4)
  .lineTo(x+31, y+48)
  .arcTo(x+31, y+40, x+31, y+44, 4)
  .lineTo(x+31, y+30)
  .arcTo(x+23, y+30, x+19, y+30, 4)
  .lineTo(x-15, y+30)
  .arcTo(x-15, y+38, x-15, y+38-4, 4)
  .arcTo(x-35, y+38, x-35, y+38-4, 4)
  .arcTo(x-35, y+30, x-35, y+34, 4)
  .lineTo(x-35, y+22)
  .lineTo(x+31, y+22)
  .arcTo(x+31, y+14, x+31, y+18, 4)
  .lineTo(x+31, y)
  .lineTo(x-15, y)

  return block;
};



const generateBlock = (name, stage, y, hasInput = false) => {
  let block = new createjs.Bitmap(`images/blocks/motion/${name}.png`);
  let blockContainer = new createjs.Container();
  blockContainer.y = y;
  blockContainer.fnName = name;
  blockContainer.hasInput = hasInput;
  blockContainer.addChild(block);

  return blockContainer;
}


export const addInputBar = (container, grid) => {
   let inputBar = document.createElement("input");
   inputBar.className = "block-input";
   inputBar.id = container.id;
  //  console.log(this);

   inputBar.addEventListener("change", grid.handleInput);
   let workstation = document.getElementsByClassName("workstation")[0];
   workstation.append(inputBar);
  let domElement = new createjs.DOMElement(inputBar);
   window.el = domElement;
   window.input = inputBar;
   container.addChildAt(domElement, 0);
   domElement.x = 28;
   domElement.y = 15;
}

export const removeInputBar = (id) => {
  let inputBar = document.getElementById(id);
  inputBar.remove();
}
