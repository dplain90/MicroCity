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
  {num: 6, x: 18.5, y: 200},
  {num: 3, x: 40, y: 300},
  {num: 10, x: 10, y: 350}
],

objects: [
  { type: 'bad', x: 60, y: 200, frame: 1, data: enemyData },
  { type: 'bad', x: 80, y: 300, frame: 2, data: enemyData },
  { type: 'avatar', x: 50, y: 300, frame: null, data: avatarData }
]
}



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
    return this.ground.concat(this.barriers, this.badGuys, [this.avatar.obj]);
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
      this.ground.push(Tile.create(x + (18.5*i), y))
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
    this.fail = false;
    this.win = false;
  }

  reset(){
    console.log('made it');
    this.obj.x = this.start_x;
    this.obj.y = this.start_y;
  }

  handleTick(pos){
    let { x, y } = pos;
    if(this.touchingGround()){
      this.obj.x += x;
      this.obj.y += y;
    } else {
      this.obj.y += 1;
    }
  }

  touchingBadGuy() {
    for (var i = 0; i < this.level.badGuys.length; i++) {
      let badGuy = this.level.badGuys[i];
      let distanceFromBadGuy = this.obj.localToLocal(0, 0, badGuy);
      console.log(Math.abs(distanceFromBadGuy.x));
      console.log(Math.abs(distanceFromBadGuy.y));
      if(Math.abs(distanceFromBadGuy.x) <= 10 && Math.abs(distanceFromBadGuy.y) <= 40){
        this.reset();
      }
    }
  }


  touchingGround(){
    if(this.jumping){
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
