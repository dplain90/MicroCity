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
