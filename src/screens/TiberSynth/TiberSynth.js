import React, { Fragment } from 'react';
import About, { NAME as ABOUT } from './components/About';
import Sidebar from './components/Sidebar';
import PlayingSurface from '../../components/PlayingSurface';
import stylesheet from './TiberSynth.less';

const Modals = ({ currentModal, onCloseModal }) => (
  <Fragment>
    <About isOpen={currentModal === ABOUT} onClose={onCloseModal} />
  </Fragment>
);

const TiberSynth = props => (
  <div className={stylesheet.container}>
    <div className={stylesheet.sidebar}>
      <Sidebar {...props} />
    </div>
    <div className={stylesheet.visualization}>
      <PlayingSurface {...props} />
    </div>
    <Modals {...props} />
  </div>
);

export default TiberSynth;
