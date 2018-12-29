import React, { Fragment } from 'react';
import About, { NAME as ABOUT } from './components/About';
import PlayingSurface from '../../components/PlayingSurface';
import Sidebar from './components/Sidebar';
import Unsupported, { NAME as UNSUPPORTED } from './components/Unsupported';
import stylesheet from './TiberSynth.less';

const Modals = ({ currentModal, onCloseModal }) => (
  <Fragment>
    <About isOpen={currentModal === ABOUT} onClose={onCloseModal} />
    <Unsupported isOpen={currentModal === UNSUPPORTED} onClose={onCloseModal} />
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
