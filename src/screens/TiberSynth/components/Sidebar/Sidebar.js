import React from 'react';
import classNames from 'classnames';
import Button from '../../../../components/Button';
import Text from '../../../../components/Text';
import Slider from '../../../../components/Slider';
import stylesheet from './Sidebar.less';

const ExplainationCopy = () => (
  <div className={classNames([stylesheet.block, stylesheet.block__expand])}>
    <Text color="white">
      TiberSynth is an experimental audio synthesizer that runs in your web
      browser. You play the synthesizer by moving your mouse around a randomized
      2D parameter space. The closer your mouse is to a given parameter, the
      more influence it has on that value.
    </Text>

    <Text color="white">
      The audio engine is a complex FM synthesizer based on cross-modulation and
      feedback. This creates excellent noise, drone, and percussion sounds.
    </Text>

    <Text color="white">
      You can create new parameter spaces, or move forward or backward through
      your spaces, using the controls below. You can also adjust ranges for
      feedback, noise, and filter values.
    </Text>
  </div>
);

const SpaceControls = ({ onRandomize, onUndo, onRedo }) => (
  <div className={classNames([stylesheet.block, stylesheet.block__margin])}>
    <div className={stylesheet.spaceControls}>
      <Button
        className={classNames([stylesheet.button, stylesheet.buttonFlex])}
        color="white"
        label="Randomize"
        onClick={onRandomize}
      />
      <Button
        className={stylesheet.button}
        color="white"
        label="Undo"
        onClick={onUndo}
      />
      <Button
        className={stylesheet.button}
        color="white"
        label="Redo"
        onClick={onRedo}
      />
    </div>
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

const Empty = () => (
  <div className={classNames([stylesheet.block, stylesheet.block__expand])} />
);

const Sidebar = props => (
  <div className={stylesheet.container}>
    <SpaceControls {...props} />
    <Empty />
    <ParameterSliders {...props} />
    <Title />
    <Visualizer />
  </div>
);

export default Sidebar;
