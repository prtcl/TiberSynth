import React from 'react';
import classNames from 'classnames';
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

const ParameterSliders = ({
  feedbackRange,
  filterRange,
  noiseRange,
  onChangeFeedback,
  onChangeFilter,
  onChangeNoise,
}) => (
  <div className={classNames([stylesheet.block, stylesheet.block__padding])}>
    <Slider
      label="Feedback"
      onChange={onChangeFeedback}
      value={feedbackRange}
    />
    <Slider label="Noise Balance" onChange={onChangeNoise} value={noiseRange} />
    <Slider
      label="Filter Range"
      onChange={onChangeFilter}
      value={filterRange}
    />
  </div>
);

const Title = () => (
  <div className={stylesheet.block}>
    <Text color="white" type="title">
      TiberSynth
    </Text>
  </div>
);

const Visualizer = () => (
  <div className={stylesheet.block}>
    <div style={{ backgroundColor: '#4c4c4c', height: '144px' }} />
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
