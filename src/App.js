import React, { Fragment } from 'react';
import TiberSynth from './screens/TiberSynth';
import compose from './lib/compose';
import { withParameterSpaceProvider } from './hoc/withParameterSpace';
import { withSynthesisEngineProvider } from './hoc/withSynthesisEngine';
import './less/reset.less';

const App = () => (
  <Fragment>
    <TiberSynth />
  </Fragment>
);

const enhance = compose(
  withParameterSpaceProvider(),
  withSynthesisEngineProvider()
);

export default enhance(App);
