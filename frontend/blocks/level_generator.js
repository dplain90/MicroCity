import ObjectGenerator from './object_generator';
import Avatar from './avatar';

class Level extends ObjectGenerator {
  constructor(data, stage){

    super(data, stage);
    this.createObject = this.createObject.bind(this);

  }

  createObject(data){

    let object;
    switch(data.type){
      case 'avatar':
        object = new Avatar(data);
        window.avatar = object; 
        break;
      default:
        return null;
    }
    debugger
    this.stage.addChild(object);
    this.stage.update();
    object.setupBounds();

    return object;
  }

}

export default Level;
