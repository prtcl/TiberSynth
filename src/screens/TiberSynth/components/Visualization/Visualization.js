import React from 'react';
import Mouse from '../../../../components/Mouse';
import stylesheet from './Visualization.less';

const Visualization = ({ onMouseMove, onMouseDown, onMouseUp }) => (
  <div className={stylesheet.container}>
    <Mouse onMove={onMouseMove} onUp={onMouseUp} onDown={onMouseDown}>
      <h1>TiberSynth</h1>
    </Mouse>
  </div>
);

export default Visualization;
