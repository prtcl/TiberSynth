import React from 'react';
import Sidebar from './components/Sidebar';
import Visualization from './components/Visualization';
import stylesheet from './TiberSynth.less';

const TiberSynth = ({ onMove, onPlay, onStop }) => (
  <div className={stylesheet.container}>
    <div className={stylesheet.sidebar}>
      <Sidebar />
    </div>
    <div className={stylesheet.visualization}>
      <Visualization
        onMouseDown={onPlay}
        onMouseMove={onMove}
        onMouseUp={onStop}
      />
    </div>
  </div>
);

export default TiberSynth;
