import React from 'react';
import classNames from 'classnames';
import stylesheet from './Separator.less';

const Separator = ({ children, top, bottom }) => (
  <div
    className={classNames(stylesheet.container, {
      [stylesheet.top]: top,
      [stylesheet.bottom]: bottom,
    })}
  >
    {children}
  </div>
);

export default Separator;
