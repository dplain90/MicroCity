import Block from '../block';

class BasicBlock extends Block {
  constructor(data){
    super(data.x, data.y);
    this.data = data;
    this.img.src = "/images/blocks/basicBlockFinal.gif";
    this.img.onload = this.imgSetup.bind(this);
  }

  imgSetup(){
    Block.setup(this);
    this.addEventListener("pressmove", this.dragCallback.bind(this));
    

  }

}

export default BasicBlock;
