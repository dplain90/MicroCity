import BlockList from './block_list';
import BasicBlock from '../blocks/types/basic';
class Palette extends BlockList {
  constructor(stage, data){
    super(stage);
    let { manifest, blocks, x } = data;
    this.x = x;
    this.createBlock = this.createBlock.bind(this);
    this.queue = new createjs.LoadQueue(true);
    this.queue.loadManifest(manifest);
    this.setupBlocks = this.setupBlocks.bind(this);
    this.queue.on("complete", this.setupBlocks(blocks), this);
  }

  setupBlocks(blocks){
    return () => {
      Object.keys(blocks).forEach((key) => this.createBlock(blocks[key]), this);
    };
  }

  createBlock(data){
    let newProps = { next: this.tail, prev: this.tail.prev, x: this.x, img: this.queue.getResult(data.name) };
    data = Object.assign({}, data, newProps);
    let block;
    switch(data.type){
      case 'basic':
        block = new BasicBlock(data);
        block.on("mousedown", block.replace);
        break;
      default:
        return null;
    }
    this.append(block);
  }


}


export default Palette;
