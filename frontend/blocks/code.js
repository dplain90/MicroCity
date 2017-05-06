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
      'move': this.motion.move,
      'jump': this.motion.jump
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
    this.leap = this.leap.bind(this);
    this.jump = this.jump.bind(this);
    this.climb = this.climb.bind(this);
    this.steps.args = ['num'];
  }

  move(axis = 'x', steps = 30, dir = 1, anim = 'move'){
      this.queue.push([anim]);
    for (var i = 0; i < steps; i++) {
      this.queue.push( [axis, dir] );
    }
  }

  climb(num){
    this.move('y', 1, 1);
  }

  jump(){
    this.leap(-1);
    this.leap(1);
  }

  leap(dir){
    for (var i = 0; i < 2; i++) {
      this.queue.push(['jump']);
      this.queue.push(['y', 10 * dir]);
      this.queue.push(['y', 10 * dir]);
      this.queue.push(['y', 10 * dir]);
      this.queue.push(['x', 10]);
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
