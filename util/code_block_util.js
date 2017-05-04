
export class Code {
  constructor(stage, obj, blocks) {
    this.stage = stage;
    this.obj = obj;
    this.blocks = blocks;
  }

  run(){
    for (let i = 0; i < this.blocks.length; i++) {
      let { fn, args } = this.blocks[i]
      fn.call(this.obj, ...args);
    }
  }
}

export class Motion extends CodeBlock {
  constructor(){
    super();
  }

  static steps(num){
    if(num > 0) {
    this.obj.x += 10;
    this.stage.update();
    this.steps(num - 1);
    }
  }
}
//
// class Events extends CodeBlock {
//
//
// }
//
// class Conditionals extends CodeBlock {
//
// }
//
// class Operators extends CodeBlock {
//

// }
export const CodeBlock =
