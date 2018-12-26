import './less/reset.less';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TiberSynth from './screens/TiberSynth';
import Welcome from './screens/Welcome';
import compose from './lib/compose';
import { withParameterSpaceProvider } from './hoc/withParameterSpace';
import { withSynthesisEngineProvider } from './hoc/withSynthesisEngine';

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

const App = ({ context, routerComponent: Router, location }) => (
  <Router {...(location ? { context, location } : {})}>
    <Switch>
      {ROUTES.map(route => (
        <Route key={route.path} {...route} />
      ))}
    </Switch>
  </Router>
);

const enhance = compose(
  withParameterSpaceProvider(),
  withSynthesisEngineProvider()
);

export default enhance(App);
