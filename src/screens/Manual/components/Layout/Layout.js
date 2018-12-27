import React from 'react';
import stylesheet from './Layout.less';

const Layout = ({ children }) => (
  <div className={stylesheet.container}>
    <div className={stylesheet.content}>{children}</div>
  </div>
);

export default Layout;
