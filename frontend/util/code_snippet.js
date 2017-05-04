export const moveHorizontal = (dir) => {
  return () => this.x += dir;
}

export const moveVertical = (dir) => {
  return () => this.y += dir;
}

export const my_snippets = [ moveHorizontal(10), moveHorizontal(30), moveVertical(-10), moveVertical(-5)];
