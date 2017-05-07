import { blockCategories } from './blockCategories';

class BlockSet {
  constructor(blocks, y_increment, start_x, start_y) {
    this.x = start_x;
    this.y = start_y;
    this.blocks = blocks;
    this.y_increment = y_increment;
    this.generateSet = this.generateSet.bind(this);
    this.set = this.generateSet();
    this.containers = this.set.map((block) => block.container);
  }

  generateSet() {
    let set = this.blocks.map( (block, idx) => {
      let { name, blockType, input } = block;
      let y = idx * this.y_increment;
      let newBlock = new Block(name, blockType, input, this.x, y);
    });

    return set;
  }

  static createSet(category, y_increment, pos) {
    let { x, y } = pos;
    let blocks = blockCategories[category]
    return new BlockSet(blocks, y_increment, x, y);
  }

}


class Block {
  constructor(name, type, inputs, x, y){
    this.inputs = inputs;
    this.name = name;
    this.type = type;
    this.y = y;
    this.x = x;
    this.generate = this.generate.bind(this);
    this.generate();
  }

  generate() {
    switch(this.type){
      case 'comparator':
        this.offset = [{x: 10, y: 5}, {x: 5, y: 0} ];
        this.comparatorBlock();
      case 'basic':
        this.offset = [{x: 20, y: 10}, {x: 5, y: 0} ];
        this.basicBlock();
      case 'basic_bottom':
        this.offset = [{x: 10, y: 5}, {x: 5, y: 0} ];
        this.basicBottomBlock();
      case 'dble_conditional':
        this.offset = [{x: 5, y: 10}, {x:0, y:60}, {x:5, y:60}];
        this.dblConditionalBlock();
      case 'conditional':
        this.offset = [{x: 10, y: 5}, {x: 5, y: 0} ];
        this.conditionalBlock();
    }
  }

  container(){
    let container = new createjs.Container();
    container.x = this.x;
    container.y = this.y;
    container.fnName = this.name;
    container.hasInput = this.inputs.length > 0 ? true : false;
    return container;
  }

  createLabel(name){
    let label = new createjs.Text(name, "6px Arial", "#ff7700");
    this.container.addChildAt(label, 0);
    return label;
  }

  createInput(input){
    input.className = "block-input";
    input.id = this.container.id;
    easelInput = new createjs.DOMElement(input);
    this.container.addChildAt(easelInput, 0);
    return easelInput;
    // These need to happen elsewhere!
    // let inputBar = document.createElement("input");
    // inputBar.addEventListener("change", grid.handleInput);
    // let workstation = document.getElementsByClassName("workstation")[0];
    // workstation.append(inputBar);
  }

  basicBlock() {
    this.container = this.container();
    let basicBlock = new createjs.Shape();
    this.container.addChild(basicBlock);
    basicBlock.graphics.beginStroke("blue").beginFill("white")
    basicBlock.graphics.rect(this.x-34, this.y+20, 55, 26);
    this.innerDisplays();
    return basicBlock;
  }

  innerDisplays(){
    let labels = blockLabels[this.name].map((name) => this.createLabel(name));

    let inputs = this.inputs.map((input) => {
      return this.createInput(input);
    });

    let innerDisplays = [];
    while(inputs.length > 0 && labels.length > 0){
      innerDisplays.push(labels.shift());
      inputs.push(inputs.shift());
    }

    innerDisplays.concat(labels, inputs);

    for (let i = 0; i < innerDisplays.length; i++) {
      let { x: xOffset, y: yOffset } = this.offset[i];
      let obj = innerDisplays[i];
      obj.x = this.x + xOffset;
      obj.y = this.y + yOffset;
    }
  }

  bottomInsideBlock() {
    this.container = this.container();
    let insideBlock = new createjs.Shape();
    this.container.addChild(insideBlock);
    let x = this.x;
    let y = this.y;
    insideBlock
      .graphics
      .moveTo(x-16, y+29)
      .beginStroke("blue")
      .beginFill("white")
      .arcTo(x-16, y+37, x-16, y+37-4, 4)
      .arcTo(x-34, y+37, x-34, y+37-4, 4)
      .arcTo(x-34, y+29, x-34, y+33, 4)
      .lineTo(x-34, y+11) // adding 10 to it
      .lineTo(x+21, y+11) // taking 10 off of the X
      .lineTo(x+21, y+29)
      .lineTo(x-16, y+29);
    return insideBlock;
  }

  conditionalBlock(incr){
    this.container = this.container();
    let conditional = new createjs.Shape();
    this.container.addChild(conditional);
    let x = this.x;
    let y = this.y;

    conditional
      .graphics
      .beginStroke("red")
      .beginFill("black")
      .moveTo(x, y)
      .lineTo(x-15, y) //top left to start of downward bezel
      .arcTo(x-15, y+8, x-15, y+8-4, 4)
      .arcTo(x-35, y+8, x-35, y+8-4, 4)
      .arcTo(x-35, y, x-35, y+4, 4)
      .lineTo(x-50, y)
      .arcTo(x-50, y+8, x-50, y+8-4, 4)
      .lineTo(x-50, y+48+incr)
      .arcTo(x-35, y+48+incr, x-35, y+52+incr, 4)
      .arcTo(x-35, y+48+8+incr, x-35, y+48-4+incr, 4)
      .arcTo(x-15, y+48+8+incr, x-15, y+48-4+incr, 4)
      .arcTo(x-15, y+48+incr, x-15, y+52+incr, 4)
      .lineTo(x+31, y+48+incr)
      .arcTo(x+31, y+40+incr, x+31, y+44+incr, 4)
      .lineTo(x+31, y+30+incr)
      .arcTo(x+23, y+30+incr, x+19, y+30+incr, 4)
      .lineTo(x-15, y+30+incr)
      .arcTo(x-15, y+38+incr, x-15, y+38-4+incr, 4)
      .arcTo(x-35, y+38+incr, x-35, y+38-4+incr, 4)
      .arcTo(x-35, y+30+incr, x-35, y+34+incr, 4)
      .lineTo(x-35, y+22)
      .lineTo(x+31, y+22)
      .arcTo(x+31, y+14, x+31, y+18, 4)
      .lineTo(x+31, y)
      .lineTo(x-15, y);

    this.innerDisplays();
    return conditional;
  }

  comparatorBlock(){
    this.container = this.container();
    let comparator = new createjs.Shape();
    this.container.addChild(comparator);
    let x = this.x;
    let y = this.y;
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

    this.innerDisplays();
    return comparator;
  }

}
