export const frame = {
  animation: null,
  movement: {
    x: 0,
    y: 0
  },
  actions: null,
  conditional: null,
  create: (val) => ([Object.assign({}, frame, val)]),
  move: function(x, y) {
    return frame.create({movement: { x: x, y: y}, type: 'movement'});
  },
  times: function(n, val) {
    let frames = [];
    for (let i = 0; i < n; i++) {
      frames = frames.concat(val);
    }
    return frames;
  },
  animate: function(type) {
    return frame.create({animation: type, type: 'animation'});
  },
  condition: function(val) {
    return frame.create({condition: val, type: 'conditional'});
  }
};

export const defaultFrame = function(){
  return frame.animate('idle', null);
};

export const step = function(num, dir) {
  let result = frame.animate('move');
  let steps = frame.times(num, frame.move(5 * dir,0));
  result = steps.concat(result);
  return result;
};

export const forward = function() {
  return step(15, 1);
};

export const repeat = function(num, increment) {
  if(increment >= num) {
    this.completed = true;
    this.fnParams = [num, 0];
  } else {
  this.fnParams = [num, increment + 1];
  }

  return [frame];
}

export const whileLoop = function() {
  let fnParams = this.fnParams;
  let block = this;
  const callback = function(x,y) {

    let callbackResult = this.constructor.prototype[fnParams].call(this, x, y);
    if(callbackResult === true){

      block.completed = true;
    } else {
      block.completed = false;
    }
  };
  return frame.condition(callback)
};

export const jump = function() {
  let result = jumpFrame.animate('jump');
  let moveY = jumpFrame.times(15, jumpFrame.move(0, -5));
  result = moveY.concat(result);
  return result;
};

export const down = function() {
  let result = downFrame.animate('jump');
  let moveY = downFrame.times(15, downFrame.move(0, 5));
  result = moveY.concat(result);
  return result;
};

export const left = function() {
  let result = step(15, -1);
  return result
};
