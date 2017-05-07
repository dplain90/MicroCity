export const createCode = (name, code) => {
  let fnList =
  {
    'steps': code.motion.steps,
    'move': code.motion.move,
    'jump': code.motion.jump,
    '!==': code.operator.notEql,
    '===': code.operator.eql,
    '<': code.operator.lessThan,
    '>': code.operator.greaterThan,
    'ifelse' : code.ifElseStatement,
    'if': code.ifStatement
  };

  return fnList[name];
}
