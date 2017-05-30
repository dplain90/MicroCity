export const conditional = function() {
return {
    prev: this,
    x: this.x,
    img: this.queue.getResult('textField'),
    offset: 10,
    name: 'selectField',
    type: 'textInput',
    inputType: 'input',
    color: '#fff',
    scaleX: 0.5,
    scaleY: 0.5,
    font: "7.5px Audiowide, cursive",
    fn: function() {
      return null;
    },
    selectOptions: [{ value: 'test', text: 'test' }, { value: 'test2', text: 'test2'}, { value: 'test3', text: 'test3' }],
    fnParams: []
  };
};
