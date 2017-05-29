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
    this.handleCondition = this.handleCondition.bind(this);
    this.tileAhead = this.tileAhead.bind(this);
    this.offBoard = this.offBoard.bind(this);
    this.projectOffBoard = this.projectOffBoard.bind(this);
    this.gameEnders = [];
    this.allChildren = [];
    this.processCondition = this.processCondition.bind(this);
    this.tracePath = this.tracePath.bind(this);
    this.test = new createjs.Shape();
    let inside = new createjs.Shape();
    this.stage = stage;
    this.history = [];
    // this.stage.update();
  }


  idle(){
    this.avatar.gotoAndStop('idle');
  }

  processCondition(callback){
    let pt = this.tracePath();
    callback.call(this, pt.x, pt.y);
  }

  tracePath(){
    let point = {x: this.avatar.x, y: this.avatar.y};
    this.history.forEach((frame) => {
        let { x: xIncr, y: yIncr } = frame.movement;
        point.x += xIncr;
        point.y += yIncr;
      }
    );
    console.log(point);
    return point;
  }

  lost(){
    if(this.offBoard(this.avatar.x, this.avatar.y)) {
      this.lineStroke.style = "#f00000";
      return true;
    } else {
      return false;
    }
  }

  reset(){
    this.allChildren.forEach((child) => child.reset());
    this.lineStroke.style = "#29ffc6";
  }

  offBoard(offX, offY){
    console.log(this.stage.getObjectUnderPoint(offX,offY) === null);
    console.log(offX);
    console.log(offY);
    return this.stage.getObjectUnderPoint(offX, offY) === null;
  }

  tileAhead(tileX, tileY){
    if(this.history.length === 0) return false;

    let lastHistory = this.history[0];
    let myNextX = lastHistory.movement.x;
    let myNextY = lastHistory.movement.y;
    debugger
    // if(myNextX === 0 && myNextY === 0){
    // } else if (myNextX === 0) {
    //
    //    myNextY = tileY + 75;
    //  } else {
    //    myNextX = tileX + 75;
    //  }


    // let lastHistory = this.history.pop();
    // let nextX = x + (75 * xIncr);
    // let nextY = y + (75 * yIncr);
    let outcome = this.projectOffBoard(tileX, myNextX, tileY, myNextY);

    // return this.offBoard(nextX, nextY);
    return outcome;
  }

  projectOffBoard(nextX, incrementX, nextY, incrementY){
    // console.log(nextX);
    if(incrementX === 0 && incrementY === 0){
    }
    else if(incrementX > 0){
      nextX += 150;
    } else {
      nextY -= 75;
    }
    return this.stage.getObjectUnderPoint(nextX, nextY) === null;
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

  handleCondition(frame){
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
      case 'line':
        let line = new createjs.Shape();
        let hit = new createjs.Shape();
        this.lineStroke = line.graphics.f().beginLinearGradientStroke(["#0cebeb","#29ffc6"], [0, 0.8], 0, 0, 300, 300).command;

        line.graphics.ss(2, "round", "round");
        hit.graphics.beginFill("white").beginStroke("white");
        data.objData.points.forEach((pt) => {
          hit.graphics.lineTo(pt.x, pt.y);
          line.graphics.lineTo(pt.x, pt.y);
        });

        this.boundaries = line;
        this.boundaries.hitArea = hit;
        this.stage.addChild(line);
      default:
        return null;
    }

    this.stage.update();

    return object;
  }

}

export default Level;
