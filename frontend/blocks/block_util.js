export const calcNextBlockPos = (container) => {
  let children = container.children;
  let blockCount = children.length - 1;
  let newY = (blockCount * 20);
  return { x: 210, y: newY };
}
