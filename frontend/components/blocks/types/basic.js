import Block from '../block';

class BasicBlock extends Block {
  constructor(data){
    let { x, y, img, prev, next } = data;
    super(x, y, next, prev);
    this.data = data;
    this.img = img;
    this.imgSetup = this.imgSetup.bind(this);
    this.imgSetup();
  }

  imgSetup(){
    Block.setup(this);
    this.addEventListener("pressmove", this.dragCallback.bind(this));
  }

}

export default BasicBlock;
