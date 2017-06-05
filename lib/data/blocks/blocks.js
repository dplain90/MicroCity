import { jump, step, forward, repeat, whileLoop, down, left, pickup } from './functions';
import { textInput, selectInput } from './inputs';

export const t = (num) => num * 75;
export const ct = (num) => t(num + 0.2);
export const et = (num) => (num * 75) + 75;
export const Blocks =
  {
    x: 45,
    blocks: {
      1:{
        offset: 10,
        name: 'up',
        type: 'basic',
        color: '#fff',
        scaleX: 0.7,
        scaleY: 0.7,
        font: "13px Orbitron, sans-serif",
        fn: jump,
        fnParams: []
      },
    2: {
      offset: 10,
      name: 'down',
      type: 'basic',
      color: '#fff',
      scaleX: 0.7,
      scaleY: 0.7,
      font: "13px Orbitron, sans-serif",
      fn: down,
      fnParams: []
    },
    3: {
        offset: 10,
        name: 'left',
        type: 'basic',
        color: '#fff',
        scaleX: 0.7,
        scaleY: 0.7,
        font: "13px Orbitron, sans-serif",
        fn: left,
       fnParams: []
      },
    4: {
      offset: 10,
      name: 'right',
      type: 'basic',
      color: '#fff',
      scaleX: 0.7,
      scaleY: 0.7,
      font: "13px Orbitron, sans-serif",
      fn: forward,
      fnParams: []
    },
    5: {
      offset: 10,
      name: 'repeat',
      type: 'loop',
      color: '#fff',
      scaleX: 0.7,
      scaleY: 0.7,
      font: "11px Orbitron, sans-serif",
      fn: repeat,
      fnParams: [0, 0],
      input: textInput
    },
    6: {
      offset: 10,
      name: 'while',
      type: 'loop',
      color: '#fff',
      scaleX: 0.7,
      scaleY: 0.7,
      font: "13px Orbitron, sans-serif",
      fn: whileLoop,
      fnParams: "",
      input: selectInput
    },
    7: {
      offset: 10,
      name: 'pickup',
      type: 'basic',
      color: '#fff',
      scaleX: 0.7,
      scaleY: 0.7,
      font: "13px Orbitron, sans-serif",
      fn: pickup,
      fnParams: []
    }

  },
  manifest: {
    "path": "assets/images/blocks/",
     "manifest": [
        {"src": "microchip7.png", "id":"right"},
        {"src": "microchip7.png", "id":"left"},
        {"src": "microchip7.png", "id":"up"},
        {"src": "microchip7.png", "id":"down"},
        {"src": "microchip7.png", "id":"repeat"},
        {"src": "microchip7.png", "id":"while"},
        {"src": "microchip7.png", "id":"pickup"},
        {"src": "conditionBlock.png", "id":"textField"}
     ]
  }
};

export const createBlkSet = (nums) => {
  let blocks = Blocks.blocks;
  let set = {};
  nums.forEach((num) => {
    set[num] = blocks[num];
  });

  return Object.assign({}, Blocks, {blocks: set});
};
