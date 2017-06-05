export const textInput = {
    offset: 10,
    name: 'textInput',
    type: 'textField',
    inputType: 'input',
    color: '#fff',
    scaleX: 0.7,
    scaleY: 0.7,
    font: "7.5px Audiowide, cursive",
    fn: function() {
      return null;
    },
    fnParams: [0, 0]
  };

export const selectInput = {
    offset: 10,
    name: 'selectField',
    type: 'selectInput',
    inputType: 'select',
    color: '#fff',
    scaleX: 0.7,
    scaleY: 0.7,
    font: "7.5px Audiowide, cursive",
    fn: function() {
      return null;
    },
    selectOptions: [{ value: 'tileAhead', text: 'Tile Ahead' }, { value: 'won', text: 'Until Complete'}],
    fnParams: ""
};
