import React from 'react';
import Button from '../Button';
import Icon from '../Icon';
import { ICON_SIZE } from '../../lib/constants';
import stylesheet from './ControlBar.less';

const SPACER = 'spacer';
const Spacer = () => <div className={stylesheet.spacer} />;

const getActionComponent = ({ type }) => {
  if (type) {
    return Icon;
  }

  return Button;
};

const ControlBar = ({ actions }) => {
  return (
    <div className={stylesheet.container}>
      {actions.map(({ onClick, ...props }, index) => {
        if (props.type === SPACER) {
          return <Spacer key={index} />;
        }

        const Comp = getActionComponent(props);

        return (
          <div className={stylesheet.action} key={index}>
            <Comp {...props} size={ICON_SIZE} onClick={onClick} />
          </div>
        );
      })}
    </div>
  );
};

export default ControlBar;
