import React, { Fragment } from 'react';
import About, { NAME as ABOUT } from './components/About';
import Manual, { NAME as MANUAL } from './components/Manual';
import Sidebar from './components/Sidebar';
import Visualization from './components/Visualization';
import stylesheet from './TiberSynth.less';

const Modals = ({ currentModal, onCloseModal }) => (
  <Fragment>
    <About isOpen={currentModal === ABOUT} onClose={onCloseModal} />
    <Manual isOpen={currentModal === MANUAL} onClose={onCloseModal} />
  </Fragment>
);

const TiberSynth = props => (
  <div className={stylesheet.container}>
    <div className={stylesheet.sidebar}>
      <Sidebar {...props} />
    </div>
    <div className={stylesheet.visualization}>
      <Visualization {...props} />
    </div>
    <Modals {...props} />
  </div>
);

export default TiberSynth;
