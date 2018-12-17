import React from 'react';
import classNames from 'classnames';
import stylesheet from './Button.less';

const COLORS = {
  white: stylesheet.colorWhite,
  black: stylesheet.colorBlack,
};

const Button = ({ className, color = 'white', label, onClick }) => {
  const classes = classNames([stylesheet.container, COLORS[color], className]);

  return (
    <button className={classes} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
