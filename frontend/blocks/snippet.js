export const generateSnippet = (fn) => {
  return { fn: fn, args: [] txt: parseTxt(fn), argNum: fn.args.length };
};

const parseName = (nameStr) => {
  return nameStr.split(" ")[-1];
};

const parseTxt = (fn) => {
  fnName = parseName(fn.name);
  fnArgs = fn.args.join(",");
  return `${fnName}(${fnArgs})`;
};
