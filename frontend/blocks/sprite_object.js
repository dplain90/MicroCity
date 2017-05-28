import GridObject from './grid_object';

class SpriteObject extends GridObject {
  constructor(spriteSheet, objData){

    super(spriteSheet, objData);
    this.touching = this.touching.bind(this);

  }

  touching(obj){
    let { x, y} = this.localToLocal(0, 0, obj);
    console.log(x);
    console.log(y);
    return Math.abs(x) <= this.width && Math.abs(y) <= this.height;
  }

}

export default SpriteObject;
