import { jump, step, forward, repeat, whileLoop, down, left } from './functions';
import { textInput, selectInput } from './inputs';
export const Blocks =
  {
    x: 5,
    blocks: {
      1:{
        offset: 10,
        name: 'up',
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
      name: 'down',
      type: 'basic',
      color: '#fff',
      scaleX: 0.5,
      scaleY: 0.5,
      font: "7.5px Audiowide, cursive",
      fn: down,
      fnParams: []
    },
    3: {
        offset: 10,
        name: 'left',
        type: 'basic',
        color: '#fff',
        scaleX: 0.5,
        scaleY: 0.5,
        font: "7.5px Audiowide, cursive",
        fn: left,
       fnParams: []
      },
    4: {
      offset: 10,
      name: 'right',
      type: 'basic',
      color: '#fff',
      scaleX: 0.5,
      scaleY: 0.5,
      font: "6.5px Audiowide, cursive",
      fn: forward,
      fnParams: []
    },
    5: {
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
    6: {
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
    "path": "assets/images/blocks/",
     "manifest": [
        {"src": "microchip1.png", "id":"right"},
        {"src": "microchip1.png", "id":"left"},
        {"src": "microchip1.png", "id":"up"},
        {"src": "microchip1.png", "id":"down"},
        {"src": "microchip1.png", "id":"repeat"},
        {"src": "microchip1.png", "id":"while"},
        {"src": "conditionBlock.png", "id":"textField"}
     ]
  }
}