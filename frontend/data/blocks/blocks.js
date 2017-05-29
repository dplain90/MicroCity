import { jump, step, forward, repeat, whileLoop } from './functions';
import { textInput, selectInput } from './inputs';
export const Blocks =
  {
    x: 5,
    blocks: {
      1:{
        offset: 10,
        name: 'jump',
        type: 'basic',
        color: '#fff',
        scaleX: 0.5,
        scaleY: 0.5,
        font: "7.5px Audiowide, cursive",
        fn: jump,
        fnParams: []
      },

    2: {
        offset: 10,
        name: 'step',
        type: 'basic',
        color: '#fff',
        scaleX: 0.5,
        scaleY: 0.5,
        font: "7.5px Audiowide, cursive",
        fn: step,
       fnParams: [2]
      },
    3: {
      offset: 10,
      name: 'forward',
      type: 'basic',
      color: '#fff',
      scaleX: 0.5,
      scaleY: 0.5,
      font: "6.5px Audiowide, cursive",
      fn: forward,
      fnParams: []
    },
    4: {
      offset: 10,
      name: 'repeat',
      type: 'loop',
      color: '#fff',
      scaleX: 0.5,
      scaleY: 0.5,
      font: "7.5px Audiowide, cursive",
      fn: repeat,
      fnParams: [0, 0],
      input: textInput
    },
    5: {
      offset: 10,
      name: 'while',
      type: 'loop',
      color: '#fff',
      scaleX: 0.5,
      scaleY: 0.5,
      font: "7.5px Audiowide, cursive",
      fn: whileLoop,
      fnParams: "",
      input: selectInput
    }
  },
  manifest: {
    "path": "images/blocks/",
     "manifest": [
        {"src": "microchip1.png", "id":"forward"},
        {"src": "microchip1.png", "id":"step"},
        {"src": "microchip1.png", "id":"jump"},
        {"src": "microchip1.png", "id":"repeat"},
        {"src": "microchip1.png", "id":"while"},
        {"src": "conditionBlock.png", "id":"textField"}
     ]
  }
}
