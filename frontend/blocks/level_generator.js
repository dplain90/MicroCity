import ObjectGenerator from './object_generator';
import Avatar from './avatar';
import Tile from './tile';
import Key from './key';
import TileGroup from './tile_group';
class Level extends ObjectGenerator {
  constructor(data, stage){
    super(data, stage);
    this.handleTick = this.handleTick.bind(this);
    this.won = this.won.bind(this);
    this.lost = this.lost.bind(this);
    this.createObject = this.createObject.bind(this);
    this.gameEnders = [];
    this.allChildren = [];
    this.test = new createjs.Shape();
    let inside = new createjs.Shape();
    this.stage = stage;
    // this.stage.update();
  }


  idle(){
    this.avatar.gotoAndStop('idle');
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
      return { status: 'lost' };
    } else if(this.won()) {
      return { status: 'won' };
    } else {
      return { status: 'ongoing' };
    }
  }

  handleTick(frame){
    let status = this.checkWinStatus();
    this.avatar.handleMove(frame);
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
        this.avatar.idle = true;
        window.avatar = this.avatar;
        this.stage.addChild(object);
        this.allChildren.push(object);
        break;
      case 'tile':
        object = new TileGroup(data, this.stage);
        break;
      case 'key':
        this.key = new Key(data);
        object = this.key;
        window.key = object;
        this.stage.addChild(object);
        // this.allChildren.push(object);
        break;
      default:
        return null;
    }

    this.stage.update();

    return object;
  }

}

export default Level;
