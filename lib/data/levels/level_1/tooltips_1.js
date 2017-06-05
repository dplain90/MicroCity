import ToolTip from '../../../components/help/tooltip';


const tipData = {
  1: {
    x: 200,
    y: 200,
    width: 250,
    height: 80,
    content: "This is an example tip!"
  },

  2: {
    x: 30,
    y: 150,
    width: 250,
    height: 80,
    content: "This is an example tip ANOTHER!"
  },

  3: {
    x: 175,
    y: 150,
    width: 250,
    height: 80,
    content: "This is an example tip BOOM!"
  },
  4: {
    x: 35,
    y: 300,
    width: 250,
    height: 80,
    content: "This is an example tip BOOM!"
  },
  5: {
    x: 150,
    y: 600,
    width: 250,
    height: 80,
    content: "This is an example tip BOOM!"
  },
  6: {
    x: 600,
    y: 625,
    width: 250,
    height: 80,
    content: "This is an example tip BOOM!",
    rotation: 180
  },
  7: {
    x: 525,
    y: 625,
    width: 250,
    height: 80,
    content: "This is an example tip BOOM!",
    rotation: 180
  },
  8: {
    x: 425,
    y: 625,
    width: 250,
    height: 80,
    content: "This is an example tip BOOM!",
    rotation: 180
  }
};

const tip1 = new ToolTip(tipData[1]);
const tip2 = new ToolTip(tipData[2]);
const tip3 = new ToolTip(tipData[3]);
const tip4 = new ToolTip(tipData[4]);
const tip5 = new ToolTip(tipData[5]);
const tip6 = new ToolTip(tipData[6]);
const tip7 = new ToolTip(tipData[7]);
const tip8 = new ToolTip(tipData[8]);
export const tooltips1 = {
  1: { obj: tip1, stage: "workstation" },
  2: { obj: tip2, stage: "grid" },
  3: { obj: tip3, stage: "grid" },
  4: { obj: tip4, stage: "workstation" },
  5: { obj: tip5, stage: "workstation" },
  6: { obj: tip6, stage: "workstation" },
  7: { obj: tip7, stage: "workstation" },
  8: { obj: tip8, stage: "workstation" }
};
