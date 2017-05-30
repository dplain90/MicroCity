
const _defaultLevels = Object.freeze({});

const LevelsReducer = (state = _defaultLevels, action) => {
  switch(action.type) {
    // case GET_LEVELS:
    //   return levelDirectory[action.difficulty];
    default:
      return state;
  }
};

export default LevelsReducer;
