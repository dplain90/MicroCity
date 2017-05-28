import ObjectGenerator from './object_generator';
import Avatar from './avatar';
import Tile from './tile';
class Level extends ObjectGenerator {
  constructor(data, stage){
    super(data, stage);
    this.handleTick = this.handleTick.bind(this);
    this.won = this.won.bind(this);
    this.lost = this.lost.bind(this);
    this.createObject = this.createObject.bind(this);
    this.gameEnders = [];
    this.allChildren = [];
  }


  lost(){
    let lostStatus = false;
    this.gameEnders.forEach((ender) => {
      if(this.avatar.touching(ender)) lostStatus = true;
    }, this);
    return lostStatus;
  }

  reset(){
    this.allChildren.forEach((child) => child.reset());
  }

  checkWinStatus(){
    if(this.lost()) {
      return { status: lost };
    } else if(this.won()) {
      return { status: won };
    } else {
      return { status: ongoing };
    }
  }

  handleTick(data){
    let status = this.checkWinStatus();
    let { movement, conditional } = data;
    this.avatar.handleMove(movement);
    if(conditional !== undefined) return conditional.call(this);
    return status;
  }

  won(){
    return this.avatar.touching(this.key);
  }

  createObject(data){
    let object;
    switch(data.type){
      case 'avatar':
        this.avatar = new Avatar(data);
        object = this.avatar;
        window.avatar = this.avatar;
        break;
      case 'tile':
        object = new Tile(data);
        window.tile = object;
        break;
      default:
        return null;
    }

    this.allChildren.push(object);
    this.stage.addChild(object);
    this.stage.update();

    return object;
  }

}

export default Level;
