import React from 'react';
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

const Icon = ({ color = 'white', onClick, size = SIZE, type, ...props }) => {
  const Type = TYPES[type];

  return (
    <a className={stylesheet.container} onClick={onClick}>
      <Type
        {...props}
        className={classNames([stylesheet.icon, COLORS[color]])}
        fontSize={`${size}px`}
      />
    </a>
  );
};

export default Icon;
