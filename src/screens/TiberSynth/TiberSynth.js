import React from 'react';
import Sidebar from './components/Sidebar';
import Visualization from './components/Visualization';
import stylesheet from './TiberSynth.less';

const TiberSynth = () => (
  <div className={stylesheet.container}>
    <div className={stylesheet.sidebar}>
      <Sidebar />
    </div>
    <div className={stylesheet.visualization}>
      <Visualization />
    </div>
  </div>
);

export default TiberSynth;
