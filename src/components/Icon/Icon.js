import React, { Component } from 'react';
import classNames from 'classnames';
import IosArrowBack from 'react-ionicons/lib/IosArrowBack';
import IosArrowDown from 'react-ionicons/lib/IosArrowDown';
import IosArrowForward from 'react-ionicons/lib/IosArrowForward';
import IosBook from 'react-ionicons/lib/IosBook';
import IosInformationCircleOutline from 'react-ionicons/lib/IosInformationCircleOutline';
import IosMenu from 'react-ionicons/lib/IosMenu';
import IosMore from 'react-ionicons/lib/IosMore';
import IosRefresh from 'react-ionicons/lib/IosRefresh';
import LogoGithub from 'react-ionicons/lib/LogoGithub';
import stylesheet from './Icon.less';

const SIZE = 24;

const COLORS = {
  white: stylesheet.colorWhite,
  black: stylesheet.colorBlack,
};

const TYPES = {
  back: IosArrowBack,
  book: IosBook,
  down: IosArrowDown,
  forward: IosArrowForward,
  github: LogoGithub,
  info: IosInformationCircleOutline,
  menu: IosMenu,
  more: IosMore,
  refresh: IosRefresh,
};

export default class Icon extends Component {
  state = {
    isActive: false,
  };

  static defaultProps = {
    color: 'white',
    isClickable: true,
    size: SIZE,
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
        onMouseLeave={this.handleMouseUp}
        onMouseUp={this.handleMouseUp}
        onTouchEnd={this.handleMouseUp}
        onTouchStart={this.handleMouseDown}
        className={classes}
      >
        {icon}
      </a>
    );
  }
}
