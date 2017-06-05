import BasicBlock from './types/basic';

class Node extends BasicBlock {
  constructor(data){
    super(data);
    this.setParent = this.setParent.bind(this);
    this.removeParent = this.removeParent.bind(this);
    this.changeParent = this.changeParent.bind(this);
    this.isHead = this.isHead.bind(this);
    this.findHead = this.findHead.bind(this);
    this.findParent = this.findParent.bind(this);
  }

  setParent(parent){
    this.parentNode = parent;
    parent.addNode(this);
  }

  removeParent(){
    if(this.parentNode) this.parentNode.removeNode(this);
    this.parentNode = null;
  }

  changeParent(newParent){
    if(this.parentNode) this.removeParent();
    this.setParent(newParent);
  }



  findParent(){
    let closest = this.prev;
    let head = this.findHead();
    if(closest.isHead() || closest.isTail()){
       return this.changeParent(head);
     }
    // first block
    if(closest.next === null) return this.changeParent(head);
    // last block

    if(closest.childNodes && closest.hasNodes()) {
      return this.changeParent(closest);
    }
    // check if its a loop.
    let closestParent = closest.parentNode;

    if(closestParent.isHead()) return this.changeParent(head);
      // parent is head

    if(closestParent.lastNode() === closest) {
      return this.changeParent(head);
    }

    this.changeParent(closestParent);
    // closest is last node of parent
  }
}

export default Node;
