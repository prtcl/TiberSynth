import React from 'react';
import classNames from 'classnames';
import stylesheet from './Separator.less';

const Separator = ({ children, top, bottom }) => (
  <div
    className={classNames(stylesheet.separator, {
      [stylesheet.top]: top,
      [stylesheet.bottom]: bottom,
    })}
  >
    {children}
  </div>
);

export default Separator;
