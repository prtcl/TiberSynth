import React, { Fragment } from 'react';
import TiberSynth from './screens/TiberSynth';
import compose from './utils/compose';
import { withSynthEngineProvider } from './hoc/withSynthEngine';
import './less/reset.less';

const App = () => (
  <Fragment>
    <TiberSynth />
  </Fragment>
);

const enhance = compose(withSynthEngineProvider());

export default enhance(App);
