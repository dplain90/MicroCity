import Node from './node';

class ParentNode extends Node {
  constructor(data){
    super(data);
    this.childNodes = new Set();
    this.connected = false;
    this.lastNode = this.lastNode.bind(this);
    this.removeNode = this.removeNode.bind(this);
    this.addNode = this.addNode.bind(this);
    this.eachNode = this.eachNode.bind(this);
    this.clearNodes = this.clearNodes.bind(this);
    this.hasNodes = this.hasNodes.bind(this);
  }

  lastNode(){
    let childNode = this.next;
    if(this.next.parentNode !== this) return null;
    let last = childNode;
    while(!childNode.isTail()) {
      if(childNode.parentNode === this) last = childNode;
      childNode = childNode.next;
    }
    return last;
  }

  removeNode(childNode){
    this.childNodes.delete(childNode);
    if(this.childNodes.size < 1) this.connected = false;
  }

  hasNodes(){
    return this.childNodes.size >= 1;
  }

  addNode(childNode){
    if(this.childNodes.size < 1) this.connected = true;
    this.childNodes.add(childNode);
  }

  eachNode(callback, args = [], ctx = this){
    let childNode = this.next;
    debugger
    while(childNode.parentNode === this){
      callback.call(ctx, childNode, ...args);
      childNode = childNode.next;
      if(childNode === null) break;
    }
  }

  clearNodes(){
    this.eachNode((childNode) => {
      childNode.changeParent(this.parentNode);
    });
  }
}

export default ParentNode;
