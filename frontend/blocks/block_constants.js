import { Code } from './code';

const createInputDOM = () => {
  let inputDOM = document.createElement("input");
  return inputDOM;
};

export const blockCategories = {
    'motion': [
      { name: 'steps', blockType: 'basic', inputs: [createInputDOM()] },
      { name: 'move', blockType: 'basic', inputs: []},
      { name: 'jump', blockType: 'basic', inputs: []},
      { name: 'times', blockType: 'loop', inputs: []}

    ],
    'operator': [
      { name: '!==', blockType: 'comparator', inputs: [createInputDOM()]},
      { name: '===', blockType: 'comparator', inputs: [createInputDOM()]},
      { name: '<', blockType: 'comparator', inputs: [createInputDOM()]},
      { name: '>', blockType: 'comparator', inputs: [createInputDOM()]}
    ],

    'conditional': [
      { name: 'ifelse', blockType: 'dble_conditional', inputs: []},
      { name: 'if', blockType: 'conditional', inputs: []},
    ]
};

export const findBlock = (name) => {
 let blocks = {
  'steps': { name: 'steps', blockType: 'basic', inputs: [createInputDOM()] },
  'move': { name: 'move', blockType: 'basic', inputs: []},
    'times': { name: 'times', blockType: 'loop', inputs: []},
  'jump': { name: 'jump', blockType: 'basic', inputs: []},
  '!==': { name: '!==', blockType: 'comparator', inputs: [createInputDOM()]},
   '===': { name: '===', blockType: 'comparator', inputs: [createInputDOM()]},
  '<': { name: '<', blockType: 'comparator', inputs: [createInputDOM()]},
  '>': { name: '>', blockType: 'comparator', inputs: [createInputDOM()]},
  'ifelse': { name: 'ifelse', blockType: 'dble_conditional', inputs: []},
  'if': { name: 'if', blockType: 'conditional', inputs: []}
}

return blocks[name];
};


export const blockLabels = {
  'steps': ['Step', 'times'],
  'times': ['Times'],
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
    'times': code.loop.times,
    '!==': code.operator.notEql,
    '===': code.operator.eql,
    '<': code.operator.lessThan,
    '>': code.operator.greaterThan,
    'ifelse' : code.ifElseStatement,
    'if': code.ifStatement
  };

  return fnList[name];
};
