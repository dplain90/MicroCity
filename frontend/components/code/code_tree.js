class CodeTree {
  constructor(rootNode){
    this.root = rootNode;
    this.processTree = this.processTree.bind(this);
    this.getQueue = this.getQueue.bind(this);
    this.execute = this.execute.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);

  }

  execute(block) {

    let frame = block.fn.call(block, ...block.fnParams);
    if(frame.length !== 0) {
      if(frame[0].type === 'conditional'){
      debugger
      this.level.processCondition(frame[0].condition);
      }
    }
    return frame;
  }

  getQueue(level){
    this.level = level;
    let queue = this.processTree(this.root);
    this.clearCompleted(this.root);
    return queue;
  }

  clearCompleted(blockNode){
    blockNode.completed = false;
    if(blockNode.codeChildren.length < 1) return null;
    let children = Array.from(blockNode.codeChildren);
    for (let i = 0; i < blockNode.codeChildren.length; i++) {
      let child = blockNode.codeChildren[i];
      let descendents = blockNode.codeChildren;
      if( descendents !== undefined && descendents.size > 0) { this.clearCompleted(child);
      }
    }
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
        // console.log('this is completed');
        // console.log(blockNode.completed);
        // this.execute(blockNode);
        // if(blockNode.completed) break;
        queue = queue.concat(descendents);
        this.level.history = queue;
      }
      if(blockNode === this.root) blockNode.completed = true;
      this.execute(blockNode);
    }

    blockNode.completed = false;
    return queue;
  }

}

export default CodeTree;
