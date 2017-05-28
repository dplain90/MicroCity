export const jump = function() {
  let result = [{animation: 'jump'}];
  [1, -1].forEach( (dir) => {
      let frame = {x: 0, y: 10 * dir};
      for (let i = 0; i < 3; i++) result.push(frame);
      result.push({x: 10, y: 0});
  });
  return result;
};

export const step = function(num) {
  let result = [{animation: 'move'}];
  let frame = { x: 5, y: 0 };
  for (let i = 0; i < num; i++) result.push(frame);
  return result;
};

export const forward = function() {
  let result = [{animation: 'move'}];
  let frame = { x: 5, y: 0 };
  for (let i = 0; i < 2; i++) result.push(frame);
  return result;
}

export const repeat = function(num, increment) {
  if(increment >= num) {
    this.completed = true;
    this.fnParams = [num, 0];
  } else {
  this.fnParams = [num, increment + 1];
  }
}
