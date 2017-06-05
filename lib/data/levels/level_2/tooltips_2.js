import ToolTip from '../../../components/help/tooltip';


const tipData = {
  1: {
    x: 200,
    y: 200,
    width: 250,
    height: 80,
    content: "This is an example tip!",
    stage: "workstaton"
  },

  2: {
    x: 200,
    y: 200,
    width: 250,
    height: 80,
    content: "This is an example tip ANOTHER!",
    stage: "workstation"
  },

  3: {
    x: 200,
    y: 200,
    width: 250,
    height: 80,
    content: "This is an example tip BOOM!"
  }
};

const tip1 = new ToolTip(tipData[1]);
const tip2 = new ToolTip(tipData[2]);
const tip3 = new ToolTip(tipData[3]);
export const tooltips2 = {
  1: { obj: tip1, stage: "workstation" },
  2: { obj: tip2, stage: "workstation" },
  3: { obj: tip3, stage: "grid" }
};
