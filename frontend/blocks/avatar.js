import SpriteObject from './sprite_object';


class Avatar extends SpriteObject {
  constructor(data){
    let { spriteSheet, objData } = data;
    super(spriteSheet, objData);
    this.actions = objData.actions;
    this.handleMove = this.handleMove.bind(this);
    this.handleAction = this.handleAction.bind(this);
  }

  handleAction(action) {
    let actionProperty = Object.keys(action).pop();
    this[actionProperty] = action[actionProperty];
  }

  handleMove(moveData){
    let { move, animation, action } = moveData;
    this.handleAction(action);
    if(animation){
      this.gotoAndPlay(animation);
    } else {
      this.move(move);
    }
  }

}

export default Avatar;
