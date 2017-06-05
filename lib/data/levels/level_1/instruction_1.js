import { tooltips1 } from './tooltips_1';

export const instructions1 = {
  1: {
    step_num: 1,
    title: "Welcome!",
    content: "Let's go through how to play, click Next to continue.",
    tips: {}
  },

  2: {
    step_num: 2,
    title: "Meet your robot",
    content: "your goal is to program your robot to pick up as many microchips as you can.",
    tips: tooltips1[2]
  },

  3: {
    step_num: 3,
    title: "Reach the gate",
    content: "To finish the level, you must go to the gate.",
    tips: tooltips1[3]
  },
  4: {
    step_num: 4,
    title: "Programming Chips",
    content: "These are your programming chips, use these to program your robot.",
    tips: tooltips1[4]
  },
  5: {
    step_num: 5,
    title: "Editor",
    content: "Drag and drop programming chips onto the editor to add instructions for your robot",
    tips: tooltips1[5]
  },
  6: {
    step_num: 6,
    title: "Running your Program",
    content: "Once your ready, click the Run button to have your robot execute your commands",
    tips: tooltips1[6]
  },
  7: {
    step_num: 7,
    title: "Reset",
    content: "To reset the position of your robot click Reset",
    tips: tooltips1[7]
  },
  8: {
    step_num: 8,
    title: "Clear",
    content: "To clear all the blocks on your editor, click Clear.",
    tips: tooltips1[8]
  }

};
