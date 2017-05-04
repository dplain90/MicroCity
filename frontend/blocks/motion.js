import Code from './code';

class Motion extends Code {
  constructor(stage, obj){
    super(stage, obj);
    this.steps = this.steps.bind(this);
    this.move = this.move.bind(this);
    this.steps.args = ['num'];
  }

  move(axis, steps){
    axis === 'x' ? this.obj.x += steps : this.obj.y += steps;
  }

  steps(num){
    if(num > 0) {
      this.obj.x += 10;
      this.stage.update();
      this.steps(num - 1);
    }
  }
}

export default Motion;
