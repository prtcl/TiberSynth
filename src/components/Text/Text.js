import React from 'react';
import classNames from 'classnames';
import stylesheet from './Text.less';

const TYPES = {
  small: stylesheet.typeSmall,
  text: stylesheet.typeText,
  title: stylesheet.typeTitle,
};

const COLORS = {
  black: stylesheet.colorBlack,
  gray: stylesheet.colorGray,
  white: stylesheet.colorWhite,
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
