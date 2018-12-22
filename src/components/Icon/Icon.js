import React, { Component } from 'react';
import classNames from 'classnames';
import IosArrowBack from 'react-ionicons/lib/IosArrowBack';
import IosArrowForward from 'react-ionicons/lib/IosArrowForward';
import IosMenu from 'react-ionicons/lib/IosMenu';
import IosMore from 'react-ionicons/lib/IosMore';
import IosRefresh from 'react-ionicons/lib/IosRefresh';
import stylesheet from './Icon.less';

const SIZE = 24;

const COLORS = {
  white: stylesheet.colorWhite,
  black: stylesheet.colorBlack,
};

const TYPES = {
  back: IosArrowBack,
  forward: IosArrowForward,
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
    const { color, size, type, ...props } = this.props;
    const { isActive } = this.state;

    const Type = TYPES[type];
    const fontSize = `${size}px`;
    const classes = classNames([
      stylesheet.container,
      COLORS[color],
      isActive && stylesheet.isActive,
    ]);

    return (
      <a
        className={classes}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onTouchEnd={this.handleMouseUp}
        onTouchStart={this.handleMouseDown}
      >
        <Type {...props} className={stylesheet.icon} fontSize={fontSize} />
      </a>
    );
  }
}
