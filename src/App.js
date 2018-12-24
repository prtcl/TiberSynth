import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TiberSynth from './screens/TiberSynth';
import Welcome from './screens/Welcome';
import compose from './lib/compose';
import { withParameterSpaceProvider } from './hoc/withParameterSpace';
import { withSynthesisEngineProvider } from './hoc/withSynthesisEngine';
import './less/reset.less';

export const ROUTES = [
  {
    exact: true,
    path: '/',
    component: Welcome,
  },
  {
    path: '/play',
    component: TiberSynth,
  },
];

const App = () => (
  <Router>
    <Fragment>
      {ROUTES.map(route => (
        <Route key={route.path} {...route} />
      ))}
    </Fragment>
  </Router>
);

const enhance = compose(
  withParameterSpaceProvider(),
  withSynthesisEngineProvider()
);

export default enhance(App);
