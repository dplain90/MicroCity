import Block from './block';
import BasicBlock from './types/basic';
class BlockList {
  constructor(blocks, stage){
    this.head = new Block();
    this.tail = new Block();
    this.stage = stage;
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.append = this.append.bind(this);
    this.each = this.each.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.remove = this.remove.bind(this);
    this.includes = this.includes.bind(this);
    this.createBlock = this.createBlock.bind(this);

    Object.keys(blocks)
      .forEach((key) => { this.append(blocks[key]) }, this);
  }

  first(){
    if(this.isEmpty()) return null;
    return this.head.next;
  }

  last(){
    if(this.isEmpty()) return null;
    return this.tail.prev;
  }

  append(data){
    let newBlock = this.createBlock(data);
    this.tail.prev.next = newBlock;
    newBlock.prev = this.tail.prev;
    newBlock.next = this.tail;
    this.tail.prev = newBlock;
    debugger
    this.stage.addChild(newBlock);
    return newBlock;
  }

  includes(block){
    let hasBlock = false;
    let callback = (currentBlock) => {
      if(currentBlock === block) hasBlock = true;
    };

    this.each(callback);
    return hasBlock;
  }

  each(callback){
    let currentBlock = this.head.next;
    while(currentBlock !== this.tail) {
      callback.call(currentBlock);
      debugger
      currentBlock = currentBlock.next;
    }
  }

  remove(block){
    let callback = (currentBlock) => {
      if(currentBlock === block) block.remove();
      this.stage.removeChild(block);
      return block;
    }

    this.each(callback);
  }

  createBlock(data){
    switch(data.type){
      case 'basic':
        return new BasicBlock(data);
        break;
      default:
        return null;
    }
  }

  isEmpty(){
    this.head.next === this.tail;
  }

}

export default BlockList;
