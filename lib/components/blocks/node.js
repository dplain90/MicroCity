import Block from './block';

class Node extends Block {
  constructor(){
    super();
  }

  setParent(parent){
    this.parentNode = parent;
    parent.addNode(this);
  }

  removeParent(){
    this.parentNode.removeNode(this);
    this.parentNode = null;
  }

  changeParent(newParent){
    this.removeParent();
    this.setParent(newParent);
  }
}

export default Node;
