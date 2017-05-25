class ParentCode {
  constructor(){ }

  static each(children, callback, params){
    for (let child of children) callback.call(child, ...params);
  }

  static removeChild(parentBlock, childBlock){
    childBlock.codeParent = null;
    parentBlock.codeChildren.delete(childBlock);
  }

  static addChild(parentBlock, childBlock){
    parentBlock.codeChildren.add(childBlock);
    childBlock.codeParent = parentBlock;
  }

  static changeParent(oldParent, newParent, child){
    ParentCode.removeChild(oldParent, child);
    ParentCode.addChild(newParent, child);
  }

  static clearChildren(parentBlock){
    parentBlock.codeChildren.clear();
    return parentBlock.codeChildren;
  }
}

export default ParentCode;
