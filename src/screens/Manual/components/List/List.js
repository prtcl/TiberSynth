import React from 'react';
import Text from '../../../../components/Text';
import stylesheet from './List.less';

export const Label = ({ children }) => (
  <dt className={stylesheet.label}>
    <Text color="black" className={stylesheet.text}>
      {children}
    </Text>
  </dt>
);

export const Item = ({ children }) => (
  <dd className={stylesheet.item}>
    <Text color="black" className={stylesheet.text}>
      {children}
    </Text>
  </dd>
);

const List = ({ children }) => (
  <dl className={stylesheet.container}>{children}</dl>
);

export default List;
