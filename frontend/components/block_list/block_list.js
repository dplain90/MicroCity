import Block from '../blocks/block';
import BasicBlock from '../blocks/types/basic';

class BlockList {
  constructor(stage){
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
  }

  first(){
    return this.head.next;
  }

  last(){
    return this.tail.prev;
  }


  append(block){
    this.tail.prev.next = block;
    this.tail.prev = block;
    if(!this.stage.contains(block)) this.stage.addChild(block);
    return block;
  }

  includes(block){
    let hasBlock = false;
    let callback = (current) => {
      if(current === block) hasBlock = true;
    };
    this.each(callback);
    return hasBlock;
  }

  each(callback){
    let currentBlock = this.head.next;
    while(currentBlock !== this.tail) {
      callback.call(currentBlock);
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


  isEmpty(){
    return this.head.next === this.tail;
  }

}

export default BlockList;
