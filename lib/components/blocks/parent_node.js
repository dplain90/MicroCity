import Node from './node';

class ParentNode extends Node {
  constructor(){
    super();
    this.childNodes = new Set();
  }

  lastNode(){
    let block = this.next;
    if(this.next.parentNode !== this) return null;
    while(block.parentNode === this) block = block.next;
    return block.prev;
  }

  removeNode(node){
    this.childNodes.delete(node);
  }

  addNode(node){
    this.childNodes.add(node);
  }

  eachNode(callback, args){
    let block = this.next;
    while(block.parentNode === this){
      callback.call(this, ...args);
      block = block.next;
      if(block === null) break;
    }
  }

  clearNodes(){
    this.eachNode((node) => {
      node.changeParent(this.parentNode);
    });
  }


}

export default ParentNode;
