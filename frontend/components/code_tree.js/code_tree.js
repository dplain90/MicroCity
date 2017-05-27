class CodeTree {
  constructor(rootNode, codeData = {}){
    this.root = rootNode;
    this.processTree = this.processTree.bind(this);
    this.add = this.add.bind(this);
    this.queue = this.processTree(this.root);
  }

  processTree(startNode){
    let children = startNode.codeChildren;
    let result = startNode.execute();
    if(children.length < 1) return result;
    let queue = [];
    until(startNode.completed) {
      for (var i = 0; i < children.length; i++) {
        let descendents = this.processTree(children[i]);
        queue.concat(descendents);
      }
      startNode.execute();
    }
    return queue;
  }

  // add(blockCode){
  //   this.codeData.merge(blockCode);
  // }

  // queue(){
  //   let codeQueue = [];
  //   Object.keys(this.codeData).forEach( (key) => {
  //     codeQueue.concat(this.codeData[key]);
  //   });
  //   return codeQueue;
  // }

}
