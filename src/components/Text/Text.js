import React from 'react';
import classNames from 'classnames';
import stylesheet from './Text.less';

const TYPES = {
  text: stylesheet.typeText,
  title: stylesheet.typeTitle,
};

const COLORS = {
  white: stylesheet.colorWhite,
  black: stylesheet.colorBlack,
};

const Text = ({ children, className, color = 'black', type = 'text' }) => {
  const classes = classNames([
    stylesheet.container,
    className,
    TYPES[type],
    COLORS[color],
  ]);

  return <span className={classes}>{children}</span>;
};

export default Text;
