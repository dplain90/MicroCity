class ObjectGenerator {
  constructor(data, stage){
    let { objects, spriteSheets } = data;
    this.stage = stage;
    this.queue = new createjs.LoadQueue(true);
    this.queue.on("complete", this.setupObjects(objects), this);
    for (var i = 0; i < spriteSheets.length; i++) {
      this.queue.loadFile(spriteSheets[i]);
    }

    this.setupObjects = this.setupObjects.bind(this);
    this.createObject = this.createObject.bind(this);


    this.extraProps = {};
    this.setupObjects(objects);
  }

  setupObjects(objs) {
    return () => {
      Object.keys(objs).forEach((key) => {
        let obj = objs[key];
        let spriteSheet = {spriteSheet: this.queue.getResult(obj.objData.id)};

        let objData = Object.assign({}, objs[key], spriteSheet);
        
        this.createObject(objData);

      }, this);
    };
  }

}

export default ObjectGenerator;
