import SpriteObject from './sprite_object';


class Avatar extends SpriteObject {
  constructor(data){
    let { spriteSheet, objData } = data;
    super(spriteSheet, objData);
  }

}

export default Avatar;
