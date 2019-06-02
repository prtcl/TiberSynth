import React from 'react';
import classNames from 'classnames';
import Text from '../Text';
import stylesheet from './FieldWrapper.less';

const FieldWrapper = ({ children, className, label, right }) => (
  <div className={classNames([stylesheet.container, className])}>
    <div className={stylesheet.labelContainer}>
      <Text className={stylesheet.label} color="white">
        {label}
      </Text>
      {right && (
        <Text className={stylesheet.value} color="gray">
          {right}
        </Text>
      )}
    </div>
    <div>{children}</div>
  </div>
);

export default FieldWrapper;
