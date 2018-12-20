import React from 'react';
import classNames from 'classnames';
import Analyzer from '../../../../components/Analyser';
import ControlBar from '../../../../components/ControlBar';
import Text from '../../../../components/Text';
import Slider from '../../../../components/Slider';
import stylesheet from './Sidebar.less';

const Spacer = () => <div className={stylesheet.spacer} />;

const SpaceControls = ({ onRandomize, onUndo, onRedo }) => (
  <div className={classNames([stylesheet.block, stylesheet.block__margin])}>
    <ControlBar
      actions={[
        { type: 'menu', color: 'white', onClick: () => console.log('menu') },
        { type: 'spacer' },
        { type: 'refresh', color: 'white', onClick: onRandomize },
        { type: 'back', color: 'white', onClick: onUndo },
        { type: 'forward', color: 'white', onClick: onRedo },
      ]}
    />
  </div>
);

const ParameterSliders = ({ onUpdateRangeValue, ranges }) => (
  <div className={classNames([stylesheet.block, stylesheet.block__padding])}>
    {ranges.map(({ id, ...rangeProps }) => (
      <Slider
        key={id}
        {...rangeProps}
        onChange={value => onUpdateRangeValue(value, id)}
      />
    ))}
  </div>
);

const Title = () => (
  <div className={stylesheet.block}>
    <div style={{ opacity: 0.95 }}>
      <Text color="white" type="title">
        TiberSynth
      </Text>
    </div>
  </div>
);

const Visualizer = () => (
  <div className={stylesheet.block}>
    <Analyzer height={144} />
  </div>
);

const Sidebar = props => (
  <div className={stylesheet.container}>
    <SpaceControls {...props} />
    <Spacer />
    <ParameterSliders {...props} />
    <Title />
    <Visualizer />
  </div>
);

export default Sidebar;
