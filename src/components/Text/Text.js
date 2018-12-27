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

const Title = ({ children, ...props }) => <h1 {...props}>{children}</h1>;
const Span = ({ children, ...props }) => <span {...props}>{children}</span>;

const getComponentForType = type => {
  if (type === 'title') {
    return Title;
  }

  return Span;
};

const Text = ({ children, className, color = 'black', type = 'text' }) => {
  const Comp = getComponentForType(type);

  const classes = classNames([
    stylesheet.container,
    className,
    TYPES[type],
    COLORS[color],
  ]);

  return <Comp className={classes}>{children}</Comp>;
};

export default Text;
