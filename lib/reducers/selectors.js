export const asArray = (code) => {
  return Object.keys(code).map(key => code[key]);
};
