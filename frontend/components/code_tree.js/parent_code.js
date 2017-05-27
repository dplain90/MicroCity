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
    ParentCode.removeChild(child);
    ParentCode.addChild(newParent, child);
  }
}

export default ParentCode;
