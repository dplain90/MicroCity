import Tile from '../../images/tiles';

let enemyData = {
      images: [ "./images/objects/enemySpritesFinal.png"],
      frames: [
        [123, 2, 70, 66],
        [312, 74, 60, 76],
        [485, 79, 69, 70]
      ]
  };

  let avatarData = {
    images: [
    "./images/avatar/robot2.gif"
  ],
    frames: [
      [3, 48, 45, 37],
      [49, 48, 49, 37],
      [100, 48, 37, 37],
      [139, 48, 42, 37],
      [183, 48, 47, 37],
      [227,48, 47 , 37],
      [274 ,48, 44 , 37],
      [318, 48, 41, 37],
      [359,48, 47 , 37],
      [406 ,48, 53, 37],
      [210,1, 41, 37],
      [251, 1, 39, 37],
      [290, 1, 41, 37],
      [51, 203, 41, 47],
      [92, 203 ,45 , 47],
      [137,  203, 44,  47],
      [181, 203 ,46 , 47],
      [227,  203, 50,  47],
      [277, 203 ,34 ,47]

    ],
    animations: {
      idle: [10, 12],
      move:[0, 9],
      jump: [16]
    }
}

const levelData = {
groundBlocks: [
  {num: 5, x: 70, y: 200},
  {num: 10, x: 300, y: 300},
  {num: 5, x: 200, y: 300}
  // {num: 10, x: 10, y: 350}
],

objects: [
  // { type: 'bad', x: 200, y: 150, frame: 1, data: enemyData },
  // { type: 'bad', x: 150, y: 150, frame: 3, data: enemyData },
  // { type: 'bad', x: 175, y: 150, frame: 2, data: enemyData },
  // { type: 'bad', x: 300, y: 150, frame: 2, data: enemyData },
  { type: 'avatar', x: 645, y: 4, frame: null, data: avatarData },
  { type: 'key', x: 350, y: 4, frame: null, data: avatarData }
]
};

const level1Data = {
  groundBlocks: [
  {num: 27, x: 0, y: 200}
],

objects: [
  { type: 'bad', x: 600, y: 150, frame: 1, data: enemyData },
  { type: 'avatar', x: 600, y: 4, frame: null, data: avatarData },
  { type: 'key', x: 350, y: 200, frame: null, data: avatarData }
]
};

const level2Data = {
 groundBlocks: [
   {num: 15, x: 0, y: 200},
   {num: 5, x: 300, y: 300}
 ],

 objects: [
   { type: 'bad', x: 200, y: 150, frame: 1, data: enemyData },
   { type: 'avatar', x: 600, y: 4, frame: null, data: avatarData },
   { type: 'key', x: 350, y: 250, frame: null, data: avatarData }
 ]
};
const level3Data = {
 groundBlocks: [
   {num: 15, x: 0, y: 200},
   {num: 5, x: 300, y: 300}
 ],

 objects: [
   { type: 'bad', x: 200, y: 150, frame: 1, data: enemyData },
   { type: 'avatar', x: 600, y: 4, frame: null, data: avatarData },
   { type: 'key', x: 350, y: 250, frame: null, data: avatarData }
 ]
};



class Level {
  constructor({ groundBlocks, objects }){
    this.groundBlocks = groundBlocks;
    this.objects = objects;
    this.ground = [];
    this.planes = [];
    this.barriers = [];
    this.badGuys = [];
  }


  createDisplayObjects() {
    this.createGround();
    this.createObjects();
    return this.ground.concat(this.barriers, this.badGuys, [this.avatar.obj], [this.key]);
  }



  createObj(x, y, frame, data) {
    let spriteSheet = new createjs.SpriteSheet(data);
    let obj = new createjs.Sprite(spriteSheet);
    obj.x = x;
    obj.y = y;
    obj.scaleX = .75;
    obj.scaleY = .75;
    obj.gotoAndStop(frame);
    return obj;
  }

  createAvatar(x, y, data){
    let avatarSheet = new createjs.SpriteSheet(avatarData);
    let avatarObj = new createjs.Sprite(avatarSheet);
    this.avatar = new Avatar(avatarObj, this);
  }

  createKey(x, y){
    this.key = new createjs.Bitmap("/images/objects/keyYellow.png");
    this.key.y = y;
    this.key.x = x;
    this.key.scaleX = .50;
    this.key.scaleY = .50;
  }
  createObjects() {
    for (var i = 0; i < this.objects.length; i++) {
      let { type, x, y, frame, data }  = this.objects[i];
      switch(type){
        case 'avatar':
          this.createAvatar(x, y, data);
        case 'bad':
          let badGuy = this.createObj(x, y, frame, data);
          this.badGuys.push(badGuy);
          break;
        case 'key':
          this.createKey(x, y);
          break;
        case 'barrier':
          let barrier = this.createObj(x, y, data);
          this.barriers.push(barrier);
          break;
      }
    }
  }

  createGround(){
    for (var i = 0; i < this.groundBlocks.length; i++) {
      let { x, y, num } = this.groundBlocks[i];
      this.planes.push({ start_x: x, end_x: x+(18.5*num), y: y} );
      this.createGroundRow(this.groundBlocks[i]);
    }
  }

  createGroundRow(rowObj){
    let {num, x, y} = rowObj;

    let row = [];
    for (var i = 0; i < num; i++) {
      let local = Tile.create(x + ((18.5 * 3)*i), y);
      // debugger
      // this.groundBlocks[i].localToGlobal(x, y);
      this.ground.push()
    }
  }
}


class Avatar {
  constructor(obj, level) {
    this.obj = obj;
    this.start_x = this.obj.x;
    this.start_y = this.obj.y;
    this.level = level;
    this.jumping = false;
    this.isReset = true;
    this.win = false;
  }

  reset(){
    this.obj.x = this.start_x;
    this.obj.y = this.start_y;
  }

  handleAnimation(animation) {
    if(animation === 'jump') {
       this.obj.jumping = true
     } else {
       this.obj.jumping = false;
     }
  }

  handleTick(pos){
    let { x, y } = pos;

    if(this.touchingGround()){
      this.obj.x += x;
      this.obj.y += y;
    } else {
      this.obj.y += 1;
    }
    this.touchingBadGuy();
    this.touchingKey();
  }

  isTouching(pos){
    let {x, y} = pos;
    return Math.abs(x) <= 10 && Math.abs(y) <= 40;
  }

  touchingKey() {
    let key = this.level.key
    let distanceFromKey = this.obj.localToLocal(0, 0, key);
    if(this.isTouching(distanceFromKey)){
      this.win = true;
      console.log('winning');
    }
  }

  touchingBadGuy() {
    for (var i = 0; i < this.level.badGuys.length; i++) {
      let badGuy = this.level.badGuys[i];
      let distanceFromBadGuy = this.obj.localToLocal(0, 0, badGuy);
      if(this.isTouching(distanceFromBadGuy)){
        this.reset();
      }
    }
  }

  touchingGround(){
  
    if(this.obj.jumping){
      return true
    } else {
      let planes = this.level.planes;
      for (var i = 0; i < planes.length; i++) {
        let {start_x, end_x, y } = planes[i];
        if(this.obj.y <= y){
          if(y - this.obj.y <= 25 && (this.obj.x + 10) >= start_x && (this.obj.x + 10) <= end_x){
            return true;
          }
        }
      }
      return false;
    }
  }


}

export { Avatar, Level, enemyData, levelData };
