import GridObject from './grid_object';

class SpriteObject extends GridObject {
  constructor(spriteSheet, objData){

    super(spriteSheet, objData);
    this.touching = this.touching.bind(this);
    this.move = this.move.bind(this);
    this.startX = this.x;
    this.startY = this.y;
  }

  reset(){
    this.x = this.startX;
    this.y = this.startY;
  }
  
  touching(obj){
    let { x, y} = this.localToLocal(0, 0, obj);
    return Math.abs(x) <= this.width && Math.abs(y) <= this.height;
  }

  move(pos){
    this.x += pos.x;
    this.y += pos.y;
  }
}

export default SpriteObject;
