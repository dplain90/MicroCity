import { RECEIVE_STAGE } from '../actions/stage_actions';

const _defaultStages = Object.freeze({
  workstation: null,
  grid: null
});

const StageReducer = (state = _defaultStages, action) => {
  switch(action.type) {
    case RECEIVE_STAGE:
      let newStages = Object.assign({}, state, action.stage);
      return newStages;
    default:
      return state;
  }
};

export default StageReducer;
