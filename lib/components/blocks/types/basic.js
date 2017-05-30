import Block from '../block';

class BasicBlock extends Block {
  constructor(data){
    let { x, y, img, prev, next, fn, fnParams } = data;
    super(x, y, next, prev);
    this.data = data;
    this.img = img;
    this.fn = fn;


    this.fnParams = fnParams;
    this.imgSetup = this.imgSetup.bind(this);
    this.imgSetup();
  }

  imgSetup(){
    Block.setup(this);
    this.on("pressmove", this.dragCallback);
    this.on("mouseover", this.hoverCallback);
  }

}

export default BasicBlock;
