import BasicBlock from './basic';
import ParentCode from '../../code/parent_code';
class Loop extends BasicBlock {
  constructor(data){
    super(data);
    let { codeChildren } = data;
    this.codeChildren = codeChildren;
    this.completed = false;
  }

}

export default Loop;
