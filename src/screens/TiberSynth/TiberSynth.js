import React from 'react';
import Sidebar from './components/Sidebar';
import Visualization from './components/Visualization';
import stylesheet from './TiberSynth.less';

const TiberSynth = props => (
  <div className={stylesheet.container}>
    <div className={stylesheet.sidebar}>
      <Sidebar {...props} />
    </div>
    <div className={stylesheet.visualization}>
      <Visualization {...props} />
    </div>
  </div>
);

export default TiberSynth;
