import React from 'react';
import Icon from '../../../../components/Icon';
import Link from '../../../../components/Link';
import Text from '../../../../components/Text';
import stylesheet from './Layout.less';

const Left = ({ label, icon, to }) => (
  <Link className={stylesheet.left} to={to}>
    <Icon type={icon} color="black" isClickable={false} />
    <Text color="black" className={stylesheet.text}>
      {label}
    </Text>
  </Link>
);

export const Header = ({ title, left }) => (
  <div className={stylesheet.header}>
    <div className={stylesheet.actions}>
      <Left {...left} />
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

const Layout = ({ children }) => (
  <div className={stylesheet.container}>
    <div className={stylesheet.page}>{children}</div>
  </div>
);

export default Layout;
