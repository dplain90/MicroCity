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
    let yDif = obj.mid().y - this.mid().y;
    let xDif = obj.mid().x - (this.x + this.width);
    debugger
    return Math.abs(xDif) <= obj.width / 2  && Math.abs(yDif) <= obj.height / 2;
  }

  move(pos){
    this.x += pos.x;
    this.y += pos.y;
  }
}

export default SpriteObject;
