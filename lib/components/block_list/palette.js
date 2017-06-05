import BlockList from './block_list';
import BasicBlock from '../blocks/types/basic';
import Node from '../blocks/node';
import ParentNode from '../blocks/parent_node';
import Loop from '../blocks/types/loop';
import TextInput from '../blocks/types/text_input';
class Palette extends BlockList {
  constructor(stage, data){
    super(stage);
    let { manifest, blocks, x } = data;
    this.x = x;
    this.newBlock = this.newBlock.bind(this);
    this.createBlock = this.createBlock.bind(this);
    this.replace = this.replace.bind(this);
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

  replace(e){
    // let replacement = Object.assign(Object.create(this), this, this.clone(true));
    //
    let formerBlk = e.currentTarget;
    let replacement = this.newBlock(formerBlk.data);

    formerBlk.prev.next = replacement;
    formerBlk.next.prev = replacement;
    replacement.next = formerBlk.next;
    replacement.prev = formerBlk.prev;
    replacement.x = formerBlk.x;
    replacement.y = formerBlk.y;
    this.stage.addChild(replacement);

    replacement.mouseChildren = false;
    formerBlk.removeAllEventListeners("mousedown");
  }

  newBlock(data){
    let block;
    switch(data.type){
      case 'basic':
        block = new Node(data);
        block.on("mousedown", this.replace);
        break;
      case 'loop':
        block = new Loop(data);
        block.on("mousedown", this.replace);
        break;
      case 'textInput':
        block = new TextInput(data);
        break;
      default:
        return null;
    }
    return block;
  }

  createBlock(data){
    let newProps = { next: this.tail, prev: this.tail.prev, x: this.x, img: this.queue.getResult(data.name) };
    data = Object.assign({}, data, newProps);
    this.append(this.newBlock(data));
  }


}


export default Palette;
