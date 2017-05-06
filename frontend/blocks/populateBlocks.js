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

const generateConditional = (x,y) => {
  let conditional = new createjs.Shape();
  conditional.graphics
    .beginStroke("black")
    .beginFill("#FF0")
    .lineTo(x+20, y)
    .lineTo(x+30, y+10)
    .lineTo(x+20, y+20)
    .lineTo(x, y+20)
    .lineTo(x-10, y+10)
    .lineTo(x, y)
    .lineTo(x+20, y);
  return conditional;
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
