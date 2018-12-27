import React from 'react';
import classNames from 'classnames';
import Link from '../Link';
import stylesheet from './Button.less';

const COLORS = {
  white: stylesheet.colorWhite,
  black: stylesheet.colorBlack,
};

const Button = ({ className, color = 'white', label, onClick, to }) => {
  const classes = classNames([stylesheet.container, COLORS[color], className]);

  if (to) {
    return (
      <Link className={classes} to={to}>
        {label}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
