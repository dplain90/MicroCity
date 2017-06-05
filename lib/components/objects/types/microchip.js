import StaticObject from '../static_object';

class MicroChip extends StaticObject {
  constructor(data){
    super(data);
    this.parentStage = this.stage;
    this.reset = this.reset.bind(this);
    this.remove = this.remove.bind(this);
  }

  reset(){
    this.visible = true;
  }

  remove(){
    this.visible = false;
  }

}

export default MicroChip;
