

class Code {
  constructor(stage, obj) {
    this.stage = stage;
    this.obj = obj;
    this.fetchFn = this.fetchFn.bind(this);
    this.queue = [];
  }


  fetchFn() {
    this.motion = new Motion(this.stage, this.obj);
    return {
      'steps': this.motion.steps,
      'move': this.motion.move
    };
  }

  run(blocks){
    let fnList = this.fetchFn();

    for (let i = 0; i < blocks.length; i++) {
      let { fn, args } = blocks[i];
        if(args.length > 0) {

          fnList[fn](...args);
        } else {
          fnList[fn]();
        }
    }
    return this.motion.queue;
  }
}

class Motion extends Code {
  constructor(stage, obj){
    super(stage, obj);
    this.steps = this.steps.bind(this);
    this.move = this.move.bind(this);
    this.steps.args = ['num'];
  }

  move(axis = 'y', steps = 30){
    for (var i = 0; i < steps; i++) {
      this.queue.push( [axis, 1] );
    }
  }

  steps(num = 9){
    if(num > 0) {
      this.queue.push( [ 'x', 10] );
      this.steps(num - 1);
    }
  }
}

export default Code;
