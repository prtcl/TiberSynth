import React from 'react';
import classNames from 'classnames';
import Analyser from '../../../../components/Analyser';
import ControlBar from '../../../../components/ControlBar';
import FieldWrapper from '../../../../components/FieldWrapper';
import Menu from '../../../../components/Menu';
import Recorder from '../../../../components/Recorder';
import Separator from '../../../../components/Separator';
import Slider from '../../../../components/Slider';
import Text from '../../../../components/Text';
import { ANALYSER_HEIGHT, GITHUB_ISSUES_LINK } from '../../../../lib/constants';
import { NAME as ABOUT } from '../About';
import { ROUTES } from '../../../../config/routes';
import HELP_TEXT from './data/helpText';
import stylesheet from './Sidebar.less';

const Spacer = () => <div className={stylesheet.spacer} />;

const NavMenu = ({ shouldShowMenu, onCloseNavMenu, onShowModal }) => (
  <Menu
    className={stylesheet.navMenu}
    isOpen={shouldShowMenu}
    onClose={onCloseNavMenu}
    items={[
      { label: 'About', icon: 'info', onClick: () => onShowModal(ABOUT) },
      { label: 'Manual', icon: 'book', to: ROUTES.MANUAL },
      {
        label: 'Issues',
        icon: 'github',
        to: GITHUB_ISSUES_LINK,
      },
    ]}
  />
);

const Navigation = ({ onOpenNavMenu }) => (
  <div className={classNames([stylesheet.block, stylesheet.block__margin])}>
    <ControlBar
      actions={[
        { type: 'menu', color: 'white', onClick: onOpenNavMenu },
        { type: 'spacer' },
      ]}
    />
  </div>
);

const SpaceControls = ({
  history,
  historyIndex,
  onRandomize,
  onRedo,
  onUndo,
}) => (
  <Separator bottom={true}>
    <FieldWrapper
      help={HELP_TEXT.SPACE_CONTROLS}
      label="Space Controls"
      right={`${historyIndex + 1}/${history.length}`}
    >
      <ControlBar
        actions={[
          { type: 'refresh', color: 'white', onClick: onRandomize },
          { type: 'spacer' },
          { type: 'back', color: 'white', onClick: onUndo },
          { type: 'forward', color: 'white', onClick: onRedo },
        ]}
      />
    </FieldWrapper>
  </Separator>
);

const OutputRecorder = () => (
  <div className={stylesheet.block}>
    <Recorder />
  </div>
);

const ParameterSliders = ({
  onChangeVolume,
  onUpdateRangeValue,
  ranges,
  volume,
}) => (
  <div className={classNames([stylesheet.block, stylesheet.block__padding])}>
    {ranges.map(({ id, ...rangeProps }) => (
      <Slider
        key={id}
        {...rangeProps}
        help={HELP_TEXT[id]}
        onChange={value => onUpdateRangeValue(value, id)}
      />
    ))}
    <Separator top={true} bottom={true}>
      <Slider label="Volume" onChange={onChangeVolume} value={volume} />
    </Separator>
  </div>
);

const Title = ({ onShowModal }) => (
  <div className={stylesheet.block}>
    <div className={stylesheet.title}>
      <Text color="white" type="title">
        TiberSynth
      </Text>
      <a onClick={() => onShowModal(ABOUT)}>
        <Text className={stylesheet.titleHelp} color="gray">
          ?
        </Text>
      </a>
    </div>
  </div>
);

const Visualizer = () => (
  <div className={stylesheet.block} style={{ height: ANALYSER_HEIGHT }}>
    <Analyser height={ANALYSER_HEIGHT} />
  </div>
);

const Sidebar = props => (
  <div className={stylesheet.container}>
    <NavMenu {...props} />
    <Navigation {...props} />
    <Spacer />
    <OutputRecorder />
    <SpaceControls {...props} />
    <ParameterSliders {...props} />
    <Title {...props} />
    <Visualizer />
  </div>
);

export default Sidebar;
