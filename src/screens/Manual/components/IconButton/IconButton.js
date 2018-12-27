import React from 'react';
import classNames from 'classnames';
import Icon from '../../../../components/Icon';
import Link from '../../../../components/Link';
import Text from '../../../../components/Text';
import stylesheet from './IconButton.less';

const IconButton = ({
  className,
  icon: type,
  label,
  position = 'left',
  ...props
}) => {
  const icon = <Icon type={type} color="black" isClickable={false} />;

  const classes = classNames([stylesheet.container, className]);

  return (
    <Link {...props} className={classes}>
      {position === 'left' && icon}
      <Text color="black" className={stylesheet.text}>
        {label}
      </Text>
      {position === 'right' && icon}
    </Link>
  );
};

export default IconButton;
