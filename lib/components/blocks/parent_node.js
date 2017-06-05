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
  }

  lastNode(){
    let childNode = this.next;
    if(this.next.parentNode !== this) return null;
    while(childNode.parentNode === this) childNode = childNode.next;
    return childNode.prev;
  }

  removeNode(childNode){
    this.childNodes.delete(childNode);
    if(this.childNodes.size < 1) this.connected = false;
  }

  addNode(childNode){
    if(this.childNodes.size < 1) this.connected = true;
    this.childNodes.add(childNode);
  }

  eachNode(callback, args, ctx = this){
    let childNode = this.next;
    while(childNode.parentNode === this){
      callback.call(ctx, childNode, ...args);
      childNode = childNode.next;
      if(node === null) break;
    }
  }

  clearNodes(){
    this.eachNode((childNode) => {
      childNode.changeParent(this.parentNode);
    });
  }


}

export default ParentNode;
