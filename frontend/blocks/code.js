class Code {
  constructor(stage, obj) {
    this.stage = stage;
    this.obj = obj;

  }

  run(blocks){
    for (let i = 0; i < blocks.length; i++) {
      let { fn, args } = blocks[i]
      fn.call(this.obj, ...args);
    }
  }
}

export default Code;
