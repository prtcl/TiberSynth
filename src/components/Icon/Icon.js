import React, { Component } from 'react';
import classNames from 'classnames';
import { ICON_SIZE } from '../../lib/constants';
import stylesheet from './Icon.less';

import IosArrowBack from 'react-ionicons/lib/IosArrowBack';
import IosArrowDown from 'react-ionicons/lib/IosArrowDown';
import IosArrowForward from 'react-ionicons/lib/IosArrowForward';
import IosBook from 'react-ionicons/lib/IosBook';
import IosClose from 'react-ionicons/lib/IosClose';
import IosCloudDownloadOutline from 'react-ionicons/lib/IosCloudDownloadOutline';
import IosInformationCircleOutline from 'react-ionicons/lib/IosInformationCircleOutline';
import IosMenu from 'react-ionicons/lib/IosMenu';
import IosMore from 'react-ionicons/lib/IosMore';
import IosPause from 'react-ionicons/lib/IosPause';
import IosPlay from 'react-ionicons/lib/IosPlay';
import IosRecording from 'react-ionicons/lib/IosRecording';
import IosRecordingOutline from 'react-ionicons/lib/IosRecordingOutline';
import IosRefresh from 'react-ionicons/lib/IosRefresh';
import IosSquare from 'react-ionicons/lib/IosSquare';
import LogoGithub from 'react-ionicons/lib/LogoGithub';

const COLORS = {
  white: stylesheet.colorWhite,
  black: stylesheet.colorBlack,
};

const TYPES = {
  back: IosArrowBack,
  book: IosBook,
  close: IosClose,
  down: IosArrowDown,
  download: IosCloudDownloadOutline,
  forward: IosArrowForward,
  github: LogoGithub,
  info: IosInformationCircleOutline,
  menu: IosMenu,
  more: IosMore,
  pause: IosPause,
  play: IosPlay,
  record: IosRecordingOutline,
  recording: IosRecording,
  refresh: IosRefresh,
  stop: IosSquare,
};

export default class Icon extends Component {
  state = {
    isActive: false,
  };

  static defaultProps = {
    color: 'white',
    isClickable: true,
    size: ICON_SIZE,
  };

  handleMouseDown = () => {
    const { onClick } = this.props;

    this.setState({ isActive: true });
    onClick();
  };

  handleMouseUp = () => {
    this.setState({ isActive: false });
  };

  render () {
    const { className, color, size, type, isClickable } = this.props;
    const { isActive } = this.state;

    const Type = TYPES[type];

    const classes = classNames([
      stylesheet.container,
      className,
      COLORS[color],
      isActive && stylesheet.isActive,
    ]);

    const icon = <Type className={stylesheet.icon} fontSize={`${size}px`} />;

    if (!isClickable) {
      return <div className={classes}>{icon}</div>;
    }

    return (
      <a
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        className={classes}
      >
        {icon}
      </a>
    );
  }
}
