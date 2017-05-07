class Code {
  constructor(stage, obj) {
    this.stage = stage;
    this.obj = obj;
    this.fetchFn = this.fetchFn.bind(this);
    this.queue = [];
  }

  fetchFn() {
    this.motion = new Motion(this.stage, this.obj);
    this.conditional = new Conditional(this.stage, this.obj);
    this.operator = new Operator(this.stage, this.obj);
    return {
      'steps': this.motion.steps,
      'move': this.motion.move,
      'jump': this.motion.jump,
      '!==': this.operator.notEql,
      '===': this.operator.eql,
      '<': this.operator.lessThan,
      '>': this.operator.greaterThan,
      'ifelse' : this.ifElseStatement,
      'if': this.ifStatement
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

class Operator extends Code {
  constructor(stage, obj){
    super(stage, obj);
    this.blockType = 'operator';
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

class Conditional extends Code {
  constructor(stage, obj){
    super(stage, obj);
    this.blockType = 'conditional';
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

class Motion extends Code {
  constructor(stage, obj){
    super(stage, obj);
    this.blockType = 'basic';
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
