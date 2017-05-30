
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './app';
import Game from './game';
import GridContainer from './grid/grid_container';
import DifficultyContainer from './difficulties/difficulty';
import WorkStationContainer from './workstation/workstation_container';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Game} />
          <Route path="/:difficulty" component={DifficultyContainer} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
