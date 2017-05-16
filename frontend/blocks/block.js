import { blockCategories, blockLabels, createCode, findBlock } from './block_constants';
import { Code } from './code';

 class BlockSet {

  constructor({category, y_increment, start_pos: {x: x, y: y}, code, parent}){
    this.code = code;
    this.x = x;
    this.y = y;

    if(blockCategories[category] === undefined) {
      this.blocks = [];
    } else {
      this.blocks = blockCategories[category];
    }

    this.parentContainer = parent;
    this.y_increment = y_increment;
    this.generateSet = this.generateSet.bind(this);
    this.generateSet();
  }

  generateSet() {
    this.set = new Set();
    for (var i = 0; i < this.blocks.length; i++) {
      let { name, blockType, inputs } = this.blocks[i];
      let y = i * this.y_increment;
      let newBlock = new Block(name, blockType, inputs, this.x, y, this.code, this);

      // debugger
      this.parentContainer.addChild(newBlock.container);

      this.set.add(newBlock);
    }
  }

  toArray() {
    return Array.from(this.set);
  }
  recalibrate(){
    // let set = Array.from(this.set);
    // let y = 0;
    // for (let i = 0; i < set.length; i++) {
    //   if(set[i].callbacks instanceof BlockSet){
    //     set[i].callbacks.recalibrate();
    //   }
    //   y += (i * this.y_increment);
    //   set[i].setPos({x: this.x, y: y});
    // }
  }



  removeBlock(blk) {
    this.parentContainer.removeChild(blk.container);
    this.set.delete(blk);
  }

  calculateY(){
    let y;
    if(this.set.size > 0) {
       y = Array.from(this.set).pop().container.offSet + this.y_increment;
       debugger
    } else {

      if(this.isCallback === true) {

        if((this.parentContainer.offSet / 30) >= 1){
          y = 30 * (this.parentContainer.offSet / 30);
        } else {
          y = 30 ;
        }
      } else {
       y = this.y + this.y_increment;
     }
    }
    return y;
  }


  addBlock(fnName) {
    let { name, blockType, inputs } = findBlock(fnName);
    let y = this.calculateY();
    let newBlk = new Block(name, blockType, inputs, this.x, y, this.code, this);
    this.set.add(newBlk);
    // this.parentContainer.addChild(newBlk.container);

    // if(this.parentContainer
    return newBlk;
  }

}

class Block {
  constructor(name, type, inputs, x, y, code, parentSet, clone){
    // this.handleLoopClick = this.handleLoopClick.bind(this);
    // this.drawArrow = this.drawArrow.bind(this);
    this.callbacks;
    clone === true ? this.isClone = true : this.isClone = false;
    this.parentSet = parentSet;
    this.fn = createCode(name, code);
    this.code = code;
    this.inputs = inputs;
    this.name = name;
    this.type = type;
    this.y = y;
    this.x = x;
    this.addCallbacks = this.addCallbacks.bind(this);
    this.createContainer = this.createContainer.bind(this);
    this.imageBlockSetup = this.imageBlockSetup.bind(this);
    this.createLabel = this.createLabel.bind(this);
    // this.addFilters = this.addFilters.bind(this);
    this.generateDisplayBlock();
  }

  setPos({x, y}){
    this.x = this.container.x = x;
    this.y = this.container.y = y;
  }


  generateDisplayBlock() {
    this.imgBlock = new Image();
    this.imgBlock.onload = this.imageBlockSetup;
    this.container = this.createContainer();
    switch(this.type){
      case 'comparator':
        this.offset = {x: 15, y: 10};
        this.comparatorBlock();
        break;
      case 'numerator':
        this.offset = {x: 22, y: 18};
        this.labelColor = "#000";
        this.imgBlock.src = "/images/blocks/numerator.gif";
        break;
      case 'basic':
        this.offset = {x: 36, y: 23};
        this.imgBlock.src = "/images/blocks/basicBlockFinal.gif";
        this.labelColor = "#fff";
        // this.imageBlockSetup("/images/blocks/basicBlockFinal.gif");
        break;
      case 'loop':
        this.offset = {x: 36, y: 23};
        this.labelColor = "#fff";
	       this.imgBlock.src = "/images/blocks/basicBlockFinal.gif";

        this.callbacks = new BlockSet({
          category: '',
          y_increment: 20,
          start_pos: { x: 67, y: 0 + this.container.offSet },
          code: this.code,
          parent: this.container
        });
        this.callbacks.isCallback = true;


        // y + 40
        // this.container.addEventListener("click", this.handleLoopClick);
        this.num = 2;
        this.fn = this.handleLoopFn();
        break;
      case 'basic_bottom':
        this.offset = {x: 15, y: 10};
        this.basicBottomBlock();
        break;
      case 'dble_conditional':
        // this.offset = [{x: 5, y: 10}, {x:0, y:60}, {x:5, y:60}];
        // this.dblConditionalBlock();
        this.offset = {x: 10, y: 5};
        this.conditionalBlock();
        break;
      case 'conditional':
        this.offset = {x: 10, y: 5};
        this.conditionalBlock();
        break;
      default:
        return null;
    }
  }




  createContainer(){
    let container = new createjs.Container();
    container.x = container.originX = this.x;
    container.y = container.originY = this.y;
    // container.setBounds(this.x, this.y, 50, 30);
    container.offSet = this.y;
    container.fnName = this.name;
    container.parentBlock = this;
    container.hasInput = this.inputs.length > 0 ? true : false;
    return container;
  }

  handleLoopFn(){
    let callbacks = Array.from(this.callbacks.set);
    let num = this.num;
    return () =>
    {
      let codeFn = createCode(this.name, this.code);
      return codeFn(num, callbacks);
    }
  }


  addCallback(blk){
    this.callback.add(blk);
  }



  createLabel(name){
    let label = new createjs.Text(name.toUpperCase(), "6.5px Audiowide, cursive", this.labelColor);
    label.y = this.y + this.offset.y;
    label.x = this.x + this.offset.x;
    label.textAlign = "center";
    this.container.addChildAt(label, 1);
    return label;
  }

  createInput(input){
    input.className = "block-input";
    input.id = this.container.id;
    let easelInput = new createjs.DOMElement(input);
    this.container.addChildAt(easelInput, 0);
    let workstation = document.getElementsByClassName("workstation")[0];
    workstation.append(input);
    return easelInput;
  }

  removeInput(){
    let inputDOMs = document.getElementsById(this.container.id);
    for (var i = 0; i < inputDOMs.length; i++) {
      inputDOMs.remove();
    }
  }

  addListeners(listeners){
    for (var i = 0; i < listeners.length; i++) {
      let { type, callback } = listeners[i];
      this.container.on(type, callback);
    }
  }

  addNumerator(numBlk){
    this.container.addChild(numBlk.container);
    numBlk.container.x = 130;
    numBlk.container.y = -5;
    this.num = parseInt(numBlk.name);
  }

  addCallbacks({x, y}, blockSet){
    let setArray = Array.from(blockSet.set);
    for (var i = 0; i < setArray.length; i++) {
      let block = setArray[i];
      let blockY = block.y;
      if(blockY <= y && blockY >= this.y && block !== this) {
        let fnName = block.name;

        // let box = new createjs.Shape();
        // box.graphics.beginLinearGradientFill(["#000000", "rgba(0, 0, 0, 0)"], [0, 1], x, y, 100, 100)
        // box.graphics.drawRect(x, y, 100, 100);
        // box.cache(x, y, 100, 100);

        blockSet.removeBlock(block);
        // let image = this.container.children[0];

        let newBlk = this.callbacks.addBlock(fnName);
        this.container.addChild(newBlk.container);
        window.myBlk = newBlk;
        // image.filters = [
        //   new createjs.AlphaMaskFilter(box.cacheCanvas)
        // ];
        // image.cache(this.x, this.y, image.width, image.height);
        // debugger
      }
    }

    // this.callbacks.recalibrate();
    this.fn = this.handleLoopFn();
    // blockSet.recalibrate();

  }

  static turnOffListeners(block, listeners){
    for (var i = 0; i < listeners.length; i++) {
      block.off(listeners[i]);
    }
  }

  static cloneBlock(container, code, parentSet){
    let { x, y } = container;
    let { name, blockType, inputs } = findBlock(container.fnName);
    return new Block(name, blockType, inputs, x+5, y+5, code, parentSet, true);

  }


  imageBlockSetup(){

    if(this.type === 'numerator'){
      this.imageBlock = new createjs.Bitmap(this.imgBlock).set({scaleX: 0.3, scaleY: 0.3});
    } else {
    this.imageBlock = new createjs.Bitmap(this.imgBlock).set({scaleX: 0.8, scaleY: 0.8});
    }
     this.imageBlock.x = this.x;
     this.imageBlock.y = this.y;
     let imageBound = this.imageBlock.getTransformedBounds();

     let box = new createjs.Shape();
     box.graphics.beginLinearGradientFill(["#000000", "rgba(0, 0, 0, 0)"], [0, 1], imageBound.x, imageBound.y, imageBound.width + 20, imageBound.height + 5)
     box.graphics.drawRect(imageBound.x, imageBound.y, imageBound.width + 20, imageBound.height + 5);
     box.cache(imageBound.x, imageBound.y, imageBound.width + 20, imageBound.height + 5);
     if(this.isClone === true){
       this.imageBlock.filters = [ new createjs.ColorFilter(0.75, 0.25, 1, 1) ];
     }

    // new createjs.ColorFilter(0.75, 0.25, 1, 1)
    // new createjs.AlphaMaskFilter(box.cacheCanvas)

    if(this.type === 'numerator') {
      this.imageBlock.cache(0, 0, imageBound.width + 80, this.imgBlock.height);
    } else {
      this.imageBlock.cache(0, 0, imageBound.width + 20, this.imgBlock.height);
  }
  this.container.on("rollover", (e) => {

    this.imageBlock.filters = [
      new createjs.ColorFilter(0.25, 0.75, 1, 1) ];
    this.imageBlock.updateCache();
    this.container.cursor = "pointer";
  });

  this.container.on("rollout", (e) => {
    this.imageBlock.filters = [ ];
    this.imageBlock.updateCache();

		});

    this.container.addChild(this.imageBlock);
    this.innerDisplays();
    let parent = this.parentSet.parentContainer;
    if(parent.isMainStage === true) {
      parent.addChild(this.container);
      parent.update();
    } else {
      parent.addChild(this.container);
    }
    return this.imageBlock;
  }

  basicBlock() {
    this.container = this.createContainer();
    //  this.container.setBounds(this.x, this.y, 50, 50);
    //  let bounds = this.container.getBounds();
    let basicBlock = new createjs.Bitmap("/images/blocks/basicBlockFinal.gif");

    basicBlock.scaleX = .70;
    basicBlock.scaleY = .70;
    basicBlock.x = this.x;
    basicBlock.y = this.y;
    this.container.addChild(basicBlock);
    // this.imageHeight = basicBlock.image.height;
    // this.imageWidth = basicBlock.image.width;
    // let basicBlock = new createjs.Shape();
    // basicBlock.graphics.beginStroke("blue").beginFill("white")
    // basicBlock.graphics.rect(this.x-34, this.y+20, 55, 26);
// debugger
    // basicBlock.x = this.x + 50;
    // basicBlock.y = this.y + 50;
    // basicBlock.y = -100;
    // this.container.setBounds(this.x-34, this.y+20, 55, 26);
    // this.innerDisplays(height, width);
    return basicBlock;
  }

  innerDisplays(){
    let labels = blockLabels[this.name].map((name) => this.createLabel(name));
    //
    // let inputs = this.inputs.map((input) => {
    //   return this.createInput(input);
    // });
    //
    // let innerDisplays = [];
    // while(inputs.length > 0 && labels.length > 0){
    //   innerDisplays.push(labels.shift());
    //   inputs.push(inputs.shift());
    // }
    //
    // innerDisplays.concat(labels, inputs);
    // let bounds = this.container.getBounds();
    // for (let i = 0; i < innerDisplays.length; i++) {
    //   let { x: xOffset, y: yOffset } = this.offset[i];
    //   let obj = innerDisplays[i];
    //
    //   obj.x = this.x + xOffset;
    //   obj.y = obj.y + yOffset;
    //
    //   //  obj.y = this.y + this.container.getBounds().height;
    // }
  }

  basicBottomBlock() {
    this.container = this.createContainer();
    let insideBlock = new createjs.Shape();
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
      .lineTo(x-16, y+29)
      .endStroke();
    this.container.addChild(insideBlock);
    // this.innerDisplays();
    return insideBlock;
  }

  conditionalBlock(incr){
    this.container = this.createContainer();
    let conditional = new createjs.Bitmap("/images/blocks/microchip_conditional.gif");
    this.container.addChild(conditional);
    // let x = this.x;
    // let y = this.y;

    // conditional
    //   .graphics
    //   .beginStroke("red")
    //   .beginFill("black")
    //   .moveTo(x, y)
    //   .lineTo(x-15, y) //top left to start of downward bezel
    //   .arcTo(x-15, y+8, x-15, y+8-4, 4)
    //   .arcTo(x-35, y+8, x-35, y+8-4, 4)
    //   .arcTo(x-35, y, x-35, y+4, 4)
    //   .lineTo(x-50, y)
    //   .arcTo(x-50, y+8, x-50, y+8-4, 4)
    //   .lineTo(x-50, y+48+incr)
    //   .arcTo(x-35, y+48+incr, x-35, y+52+incr, 4)
    //   .arcTo(x-35, y+48+8+incr, x-35, y+48-4+incr, 4)
    //   .arcTo(x-15, y+48+8+incr, x-15, y+48-4+incr, 4)
    //   .arcTo(x-15, y+48+incr, x-15, y+52+incr, 4)
    //   .lineTo(x+31, y+48+incr)
    //   .arcTo(x+31, y+40+incr, x+31, y+44+incr, 4)
    //   .lineTo(x+31, y+30+incr)
    //   .arcTo(x+23, y+30+incr, x+19, y+30+incr, 4)
    //   .lineTo(x-15, y+30+incr)
    //   .arcTo(x-15, y+38+incr, x-15, y+38-4+incr, 4)
    //   .arcTo(x-35, y+38+incr, x-35, y+38-4+incr, 4)
    //   .arcTo(x-35, y+30+incr, x-35, y+34+incr, 4)
    //   .lineTo(x-35, y+22)
    //   .lineTo(x+31, y+22)
    //   .arcTo(x+31, y+14, x+31, y+18, 4)
    //   .lineTo(x+31, y)
    //   .lineTo(x-15, y)
    //   .endStroke();;
    //
    // this.innerDisplays();
    return conditional;
  }


  comparatorBlock(){
    this.container = this.createContainer();
    let comparator = new createjs.Bitmap("/images/blocks/microchip_comparator.gif");
    // comparator.scaleX = .25;
    // comparator.scaleY = .25;
    // let newBounds = comparator.getTransformedBounds();
    comparator.x = this.x ;
    comparator.y = this.y;
    comparator.scaleX = .30;
    comparator.scaleY = .30;
    this.imageBlock = comparator;
    // let comparator = new createjs.Shape();
    this.container.addChild(comparator);
    // let x = this.x;
    // let y = this.y;
    // comparator.graphics
    //   .beginStroke("black")
    //   .beginFill("#FF0")
    //   .lineTo(x+20, y)
    //   .lineTo(x+30, y+10)
    //   .lineTo(x+20, y+20)
    //   .lineTo(x, y+20)
    //   .lineTo(x-10, y+10)
    //   .lineTo(x, y)
    //   .lineTo(x+20, y);

    // this.innerDisplays();
    return comparator;
  }

}

export { Block, BlockSet };
