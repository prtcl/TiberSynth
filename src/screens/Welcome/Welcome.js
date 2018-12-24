import React from 'react';
import About from './components/About';
import PlayingSurface from '../../components/PlayingSurface';
import stylesheet from './Welcome.less';

const Welcome = props => (
  <div className={stylesheet.container}>
    <PlayingSurface {...props} shouldDisplayLabels={false} />
    <About isCompatibleBrowser={props.isCompatibleBrowser} />
  </div>
);

export default Welcome;
