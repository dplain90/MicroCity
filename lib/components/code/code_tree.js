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
      this.level.processCondition(frame[0].condition);
      }
    }
    return frame;
  }

  getQueue(level){
    this.level = level;
    let queue = this.processTree(this.root);
    // this.clearCompleted(this.root);
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

  processTree(node){
    let result = this.execute(node);
    if(node.childNodes.size >= 1 && node.connected){
      let queue = [];
      let callback = function(node){
        let descendents = this.processTree(node);
        if(node.isHead()) {
          queue = descendents.concat(queue);
        } else {
          queue = descendents.concat(queue);
        }
        this.level.history = queue;
      }

      while(!node.completed) {
        if(node.isHead()){
          node.completed = true;
          let headChild = node.next;
          while(!headChild.isTail()){
            callback.call(this, headChild, []);
            headChild = headChild.next;
            if(node === null) break;
          }
        } else {
          node.eachNode(callback, [], this);
        }

        this.execute(node);
      }

      node.completed = false;
      return queue;
    } else {
      return result;
    }
  }

  //
  //   let children = Array.from(blockNode.codeChildren);
  //   if(children.length < 1) {
  //     return result;
  //   }
  //
  //   while(!blockNode.completed) {
  //     for (let i = 0; i < children.length; i++) {
  //       let descendents = this.processTree(children[i]);
  //       // console.log('this is completed');
  //       // console.log(blockNode.completed);
  //       // this.execute(blockNode);
  //       // if(blockNode.completed) break;
  //       if(blockNode === this.root) {
  //         queue = descendents.concat(queue);
  //       } else {
  //         queue = queue.concat(descendents);
  //       }
  //       this.level.history = queue;
  //     }
  //
  //     if(blockNode === this.root) blockNode.completed = true;
  //     this.execute(blockNode);
  //   }
  //
  //   blockNode.completed = false;
  //   return queue;
  // }
}
export default CodeTree;
