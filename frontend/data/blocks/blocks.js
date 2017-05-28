import { jump, step, forward, repeat } from './functions';

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
      fn: repeat
    }
  },
  manifest: {
    "path": "images/blocks/",
     "manifest": [
        {"src": "microchip1.png", "id":"forward"},
        {"src": "microchip1.png", "id":"step"},
        {"src": "microchip1.png", "id":"jump"},
        {"src": "microchip1.png", "id":"repeat"},
        {"src": "conditionBlock.png", "id":"textField"}
     ]
  }
}
