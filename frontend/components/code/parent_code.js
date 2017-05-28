class ParentCode {
  constructor(){ }

  static each(children, callback){
    for (let child of children) callback.call(null, child);
  }

  static isLast(child){
    return child === Array.from(child.codeParent.codeChildren).pop();
  }

  static lastChild(parent){
    return Array.from(parent.codeChildren).pop();
  }

  static isParent(block){
    return block.codeChildren !== undefined && block.codeChildren.size > 0;
  }

  static removeChild(child){
    if(child.codeParent !== null && child.codeParent !== undefined) {
      let parent = child.codeParent;
      let connector = child.connectContainer;
      if(parent.prev !== null) {
        if(connector !== undefined && this.isLast(child)) {
          child.removeChild(connector);
        } else {
          parent.editor.recalibrate();
        }
        child.stage.update();
        parent.codeChildren.delete(child);
        parent.completeConnection();
      } else {
        parent.codeChildren.delete(child);
      }

      child.codeParent = null;

      if(parent.line !== undefined){
        parent.reset();
      }
    }
  }

  static addChild(parentBlock, childBlock){
    parentBlock.codeChildren.add(childBlock);
    childBlock.codeParent = parentBlock;
  }

  static changeParent(oldParent, newParent, child){
    ParentCode.removeChild(child);
    ParentCode.addChild(newParent, child);
  }

  static clearChildren(parent){
    if(parent.prev === null) return null;
    ParentCode.each(parent.codeChildren, (child) => {
      child.codeParent = parent.codeParent;
      child.removeChild(child.connectContainer);
    });

    parent.codeChildren.clear();
  }

  static insertChild(closestBlock, child){
    let children;
    if(this.isParent(closestBlock)){
      children = Array.from(closestBlock.codeChildren);
      children.unshift(child);
      closestBlock.codeChildren = new Set(children);
      child.codeParent = closestBlock;
    } else {

      let parent = closestBlock.codeParent;
      children = Array.from(parent.codeChildren);
      let i = 0;
      while(children[i] !== closestBlock) i++;
      children.splice(i, 0, child);
      debugger
      parent.codeChildren = new Set(children);
      child.codeParent = parent;

    }
  }
  static clearRelationship(block){

    if(block.codeParent !== null){
      let parent = block.codeParent;
      ParentCode.removeChild(block);
      if(parent.codeChildren.size > 0) {
        parent.completeConnection();
      } else {
        parent.fillInnerRect.style = "#57667a";

        if(block.stage.contains(parent.line)) {
          parent.line.graphics.clear();
        }
      }

      ParentCode.each(block.codeChildren, (child) => { ParentCode.removeChild(child);
        child.removeChild(child.connectContainer);
      });

    }
  }
}

export default ParentCode;
