import Block from '../blocks/block';
import BasicBlock from '../blocks/types/basic';
import ParentCode from '../code/parent_code';
import ParentNode from '../blocks/parent_node';

class BlockList {
  constructor(stage){
    this.tail = new Block();
    this.head = new Block();

    this.head.y = 5;
    this.head.height = 0;
    this.head.closed = true;
    this.head.prev = null;
    this.head.next = this.tail;
    this.stage = stage;

    this.tail.prev = this.head;
    this.tail.next = null;
    this.append = this.append.bind(this);
    this.each = this.each.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.remove = this.remove.bind(this);
    this.includes = this.includes.bind(this);
    this.first = this.first.bind(this);
  }

  first(){
    return this.head.next;
  }

  last(){
    return this.tail.prev;
  }

  getIdx(block){
    let currentBlock = this.head;
    let i = -1;
    while(currentBlock !== block){
      i+=1;
      currentBlock = currentBlock.next;
    }
    return i;
  }
  append(block){
    this.tail.prev.next = block;
    this.tail.prev = block;
    if(!this.stage.contains(block)) this.stage.addChild(block);
    return block;
  }

  includes(block){
    let hasBlock = false;
    this.each(function(){
      if(this === block) hasBlock = true;
    });
    return hasBlock;
  }

  each(callback){
    let currentBlock = this.head.next;
    let i = 0;
    while(currentBlock !== this.tail && currentBlock !== null) {
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
