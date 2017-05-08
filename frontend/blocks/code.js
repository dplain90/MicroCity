class Code {
  constructor() {
    this.run = this.run.bind(this);
    this.blocks = [];
    this.queue = [];
    this.motion = new Motion(this);
    this.conditional = new Conditional(this);
    this.operator = new Operator(this);
    this.run = this.run.bind(this);
  }

  removeBlock(blk_id){
    let newBlockSet = []
    for (var i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].block_id !== blk_id){ newBlockSet.push(this.blocks[i]);
      }
    }
    this.blocks = newBlockSet;
  }

  run(){
    for (let i = 0; i < this.blocks.length; i++) {

     this.blocks[i].fn();
        // if(args.length > 0) {
        //   fn(...args);
        // } else {
          // fn();
        // }
    }
    return this.queue;
  }
}

class Operator {
  constructor(code) {
    this.queue = code.queue;
  }

  notEql(var1, var2) {
    return var1 !== var2;
  }

  eql(var1, var2){
    return var1 === var2;
  }

  lessThan(var1, var2){
    return var1 < var2;
  }

  greaterThan(var1, var2){
    return var1 > var2;
  }
}

class Conditional {
  constructor(code) {
    this.queue = code.queue;
  }

  ifElseStatement(operator, trueFn, falseFn){
    if(operator){
      trueFn();
    } else {
      falseFn();
    }
  }

  ifStatement(operator, trueFn){
    if(operator) trueFn();
  }
}

class Motion {
    constructor(code) {
      this.queue = code.queue;
      this.steps = this.steps.bind(this);
      this.move = this.move.bind(this);
      this.leap = this.leap.bind(this);
      this.jump = this.jump.bind(this);
      this.climb = this.climb.bind(this);
    }
  // constructor(stage, obj){
  //   super(stage, obj);
  //   this.blockType = 'basic';
  //
  //   this.steps.args = ['num'];
  // }

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

const CodeEngine = new Code();
export { Code, CodeEngine } ;
