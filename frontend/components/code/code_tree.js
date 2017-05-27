class CodeTree {
  constructor(rootNode){
    this.root = rootNode;
    this.processTree = this.processTree.bind(this);
    this.getQueue = this.getQueue.bind(this);
    this.execute = this.execute.bind(this);
  }

  execute(block) {
    return block.fn.call(block, ...block.fnParams);
  }

  getQueue(){
    return this.processTree(this.root);
  }

  processTree(blockNode){
    let children = Array.from(blockNode.codeChildren);
    let result = this.execute(blockNode);
    if(children.length < 1) {
      return result;
    }
    let queue = [];
    while(!blockNode.completed) {
      for (var i = 0; i < children.length; i++) {
        let descendents = this.processTree(children[i]);
        queue = queue.concat(descendents);
      }
      if(blockNode === this.root) blockNode.completed = true;
      this.execute(blockNode);
    }

    blockNode.completed = false;
    return queue;
  }

}

export default CodeTree;
