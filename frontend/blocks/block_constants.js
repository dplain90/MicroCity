export const blockCategories = {
    'motion': [
      { name: 'steps', blockType: 'basic', input: 1 },
      { name: 'move', blockType: 'basic', input: 0},
      { name: 'jump', blockType: 'basic', input: 0},

    ],
    'operator': [
      { name: '!==', blockType: 'comparator', input: 1},
      { name: '===', blockType: 'comparator', input: 1},
      { name: '<', blockType: 'comparator', input: 1},
      { name: '>', blockType: 'comparator', input: 1}
    ],

    'conditional': [
      { name: 'ifelse', blockType: 'dble_conditional', input: 0},
      { name: 'if', blockType: 'conditional', input: 0},
    ]
}

export const findBlock = (name) => {
 let blocks = {
  'steps': { name: 'steps', blockType: 'basic', input: 1 },
  'move': { name: 'move', blockType: 'basic', input: 0},
  'jump': { name: 'jump', blockType: 'basic', input: 0},
  '!==': { name: '!==', blockType: 'comparator', input: 1},
   '===': { name: '===', blockType: 'comparator', input: 1},
  '<': { name: '<', blockType: 'comparator', input: 1},
  '>': { name: '>', blockType: 'comparator', input: 1},
  'ifelse': { name: 'ifelse', blockType: 'dble_conditional', input: 0},
  'if': { name: 'if', blockType: 'conditional', input: 0}
}

return blocks[name];
};


export const blockLabels = {
  'steps': ['Step', 'times'],
  'move': ['Forward'],
  'jump': ['Jump'],
  '!==': ['Not Equal'],
  '<': ['Less Than'],
  '>': ['More Than'],
  'ifelse': ['If', 'Else'],
  'if': ['If']
};

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
