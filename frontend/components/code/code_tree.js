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
    let children = blockNode.codeChildren;
    let result = this.execute(blockNode);
    if(children.length < 1) {
      return result;
    }
    let queue = [];
    while(!blockNode.completed) {
      for (var i = 0; i < children.length; i++) {
        let descendents = this.processTree(children[i]);
        queue.concat(descendents);
      }
      this.execute(blockNode);
    }
    return queue;
  }

}

export default CodeTree;
