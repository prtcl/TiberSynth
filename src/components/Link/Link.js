import React from 'react';
import classNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';
import stylesheet from './Link.less';

const COLORS = {
  white: stylesheet.colorWhite,
  black: stylesheet.colorBlack,
};

const Anchor = ({ children, ...props }) => <a {...props}>{children}</a>;

const isRemoteURL = url => url.includes('http');

const getLinkProps = ({ onClick, to }) => {
  if (onClick) {
    return { onClick };
  }

  if (isRemoteURL(to)) {
    return { href: to, target: '_blank', rel: 'noopener noreferrer' };
  }

  return { to };
};

const getLinkComponent = ({ onClick, to }) => {
  if (onClick || isRemoteURL(to)) {
    return Anchor;
  }

  return RouterLink;
};

const Link = ({
  bold,
  children,
  color,
  className,
  onClick,
  to = '',
  ...props
}) => {
  const Comp = getLinkComponent({ onClick, to });
  const linkProps = getLinkProps({ onClick, to });

  const classes = classNames([
    stylesheet.container,
    COLORS[color],
    bold && stylesheet.bold,
    className,
  ]);

  return (
    <Comp {...props} {...linkProps} className={classes}>
      {children}
    </Comp>
  );
};

export default Link;
