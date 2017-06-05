import ToolTip from '../../../components/help/tooltip';


const tipData = {
  1: {
    x: 200,
    y: 300,
    width: 250,
    height: 80,
    content: "This is an example tip!"
  }
};

const tip1 = new ToolTip(tipData[1]);

export const tooltips2 = {
  1: { obj: tip1, stage: "grid" }
};
