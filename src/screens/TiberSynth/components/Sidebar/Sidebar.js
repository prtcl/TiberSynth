import React from 'react';
import classNames from 'classnames';
import Analyzer from '../../../../components/Analyser';
import ControlBar from '../../../../components/ControlBar';
import Menu from '../../../../components/Menu';
import Slider from '../../../../components/Slider';
import Text from '../../../../components/Text';
import stylesheet from './Sidebar.less';

const Spacer = () => <div className={stylesheet.spacer} />;

const Seperator = ({ children }) => (
  <div className={stylesheet.seperator}>{children}</div>
);

const NavMenu = ({ shouldShowMenu, onCloseNavMenu, onShowModal }) => (
  <Menu
    className={stylesheet.navMenu}
    isOpen={shouldShowMenu}
    onClose={onCloseNavMenu}
    items={[
      { label: 'About', icon: 'info', onClick: () => onShowModal('INFO') },
      { label: 'Manual', icon: 'book', onClick: () => onShowModal('MANUAL') },
      {
        label: 'GitHub',
        icon: 'github',
        to: 'https://github.com/prtcl/tibersynth',
      },
    ]}
  />
);

const SpaceControls = ({ onRandomize, onUndo, onRedo, onOpenNavMenu }) => (
  <div className={classNames([stylesheet.block, stylesheet.block__margin])}>
    <ControlBar
      actions={[
        { type: 'menu', color: 'white', onClick: onOpenNavMenu },
        { type: 'spacer' },
        { type: 'refresh', color: 'white', onClick: onRandomize },
        { type: 'back', color: 'white', onClick: onUndo },
        { type: 'forward', color: 'white', onClick: onRedo },
      ]}
    />
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
        onChange={value => onUpdateRangeValue(value, id)}
      />
    ))}
    <Seperator>
      <Slider label="Volume" onChange={onChangeVolume} value={volume} />
    </Seperator>
  </div>
);

const Title = () => (
  <div className={stylesheet.block}>
    <div className={stylesheet.title}>
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
    <NavMenu {...props} />
    <SpaceControls {...props} />
    <Spacer />
    <ParameterSliders {...props} />
    <Title />
    <Visualizer />
  </div>
);

export default Sidebar;
