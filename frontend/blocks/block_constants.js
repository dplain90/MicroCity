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
    ],
    'numerator': [
      { name: '1', blockType: 'numerator', inputs:[]},
      { name: '2', blockType: 'numerator', inputs:[]},
      { name: '3', blockType: 'numerator', inputs:[]},
      { name: '4', blockType: 'numerator', inputs:[]},
      { name: '5', blockType: 'numerator', inputs:[]},
      { name: '6', blockType: 'numerator', inputs:[]},
      { name: '7', blockType: 'numerator', inputs:[]},
      { name: '8', blockType: 'numerator', inputs:[]},
      { name: '9', blockType: 'numerator', inputs:[]}
    ]
};

export const findBlock = (name) => {
 let blocks = {
  '1': { name: '1', blockType: 'numerator', inputs:[]},
  '2': { name: '2', blockType: 'numerator', inputs:[]},
  '3': { name: '3', blockType: 'numerator', inputs:[]},
  '4': { name: '4', blockType: 'numerator', inputs:[]},
  '5': { name: '5', blockType: 'numerator', inputs:[]},
  '6': { name: '6', blockType: 'numerator', inputs:[]},
  '7': { name: '7', blockType: 'numerator', inputs:[]},
  '8': { name: '8', blockType: 'numerator', inputs:[]},
  '9': { name: '9', blockType: 'numerator', inputs:[]},
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
  '1': ['1'],
  '2': ['2'],
  '3': ['3'],
  '4': ['4'],
  '5': ['5'],
  '6': ['6'],
  '7': ['7'],
  '8': ['8'],
  '9': ['9'],
  'steps': ['Step'],
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
