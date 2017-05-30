import SpriteObject from '../sprite_object';


class Avatar extends SpriteObject {
  constructor(data){
    let { spriteSheet, objData } = data;
    super(spriteSheet, objData);
    this.actions = objData.actions;
    this.handleMove = this.handleMove.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.gotoAndPlay = this.gotoAndPlay.bind(this);
    this.handleFrame = {
      'animation': this.gotoAndPlay,
      'movement': this.move,
      'action': this.handleAction
    };
    this.alpha = 1;
  }

  handleAction(action) {
    let actionProperty = Object.keys(action).pop();
    this[actionProperty] = action[actionProperty];
  }

  handleMove(frame){
    let val = frame[frame.type];
    this.handleFrame[frame.type](val);
  }

}

export default Avatar;
