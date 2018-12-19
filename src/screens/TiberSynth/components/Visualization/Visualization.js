import React from 'react';
import Mouse from '../../../../components/Mouse';
import stylesheet from './Visualization.less';

const Visualization = ({ onMove, onPlay, onStop }) => (
  <div className={stylesheet.container}>
    <Mouse onMove={onMove} onUp={onStop} onDown={onPlay} onLeave={onStop} />
  </div>
);

export default Visualization;
