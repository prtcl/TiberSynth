import React from 'react';
import IconButton from '../IconButton';
import Text from '../../../../components/Text';
import stylesheet from './Layout.less';

export const Header = ({ title, left }) => (
  <div className={stylesheet.header}>
    <div className={stylesheet.actions}>
      <IconButton {...left} />
    </div>
    <div className={stylesheet.title}>
      <Text type="header" color="black">
        {title}
      </Text>
    </div>
  </div>
);

export const Content = ({ children }) => (
  <div className={stylesheet.content}>{children}</div>
);

export const PageControls = ({ right, left }) => (
  <div className={stylesheet.pageControls}>
    {left && (
      <IconButton
        {...left}
        className={stylesheet.left}
        icon="back"
        position="left"
      />
    )}
    {right && (
      <IconButton
        {...right}
        className={stylesheet.right}
        icon="forward"
        position="right"
      />
    )}
  </div>
);

const Layout = ({ children }) => (
  <div className={stylesheet.container}>
    <div className={stylesheet.page}>{children}</div>
  </div>
);

export default Layout;
