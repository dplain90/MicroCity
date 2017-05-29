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
  return frame.animate('idle');
};

export const step = function(num) {
  let result = frame.animate('move');
  let steps = frame.times(num, frame.move(5,0));
  result = steps.concat(result);
  return result;
};

export const forward = function() {
  return step(17);
};

export const repeat = function(num, increment) {
  if(increment >= num) {
    this.completed = true;
    this.fnParams = [num, 0];
  } else {
  this.fnParams = [num, increment + 1];
  }
}


export const jump = function() {
  let result = frame.animate('jump');
  // [1, -1].forEach( (dir) => {
  let moveY = frame.times(17, frame.move(0, -5));
  // let moveX = frame.move(10,0);
  result = moveY.concat(result);
  // });
  return result;
};
