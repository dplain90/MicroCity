export const generateSnippet = (fn) => {
  return { fn: fn, args: [], name: parseName(fn.name), txt: parseTxt(fn) };
};

const parseName = (nameStr) => {
  return nameStr.split(" ")[-1];
};

const parseTxt = (fn) => {
  let fnName = parseName(fn.name);
  // debugger
  // let fnArgs = fn.args.join(",");
  return `${fnName}()`;
};
