import SpriteObject from '../sprite_object';


class Avatar extends SpriteObject {
  constructor(data){
    let { spriteSheet, objData } = data;
    super(spriteSheet, objData);
    this.actions = objData.actions;
    this.handleMove = this.handleMove.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.gotoAndPlay = this.gotoAndPlay.bind(this);
    this.handlePickUp = this.handlePickUp.bind(this);
    this.touchingChip = this.touchingChip.bind(this);
    this.handleFrame = {
      'animation': this.gotoAndPlay,
      'movement': this.move,
      'action': this.handleAction,
      'pickup': this.handlePickUp
    };
    this.alpha = 1;
  }

  handleAction(action) {
    let actionProperty = Object.keys(action).pop();
    this[actionProperty] = action[actionProperty];
  }

  handlePickUp() {

    let remaining = this.avatarChips
    this.avatarChips.forEach((microchip, i) => {

      if(this.touchingChip(microchip)) {
         microchip.remove();
         remaining.splice(i, 1);
      }
    }, this);
    return remaining;
  }

  touchingChip(chip){
    let yDif = chip.mid().y - this.mid().y;
    let xDif = chip.mid().x - this.mid().x;
  
    return Math.abs(xDif) <= this.width / 2  && Math.abs(yDif) <= this.height / 2 && chip.visible === true;
  }
  handleMove(frame, microchips){
    let val = frame[frame.type];
    this.avatarChips = microchips;
    return this.handleFrame[frame.type](val);
  }

}

export default Avatar;
