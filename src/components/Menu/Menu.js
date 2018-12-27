import React, { Component, Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import Mousetrap from '../../lib/mousetrap';
import Icon from '../Icon';
import Text from '../Text';
import Link from '../Link';
import stylesheet from './Menu.less';

const ESCAPE = 'esc';

const TIMEOUT = {
  enter: 50,
  exit: 75,
};

const TRANSITION_CLASSES = {
  enter: stylesheet.fadeEnter,
  enterActive: stylesheet.fadeEnterActive,
  exit: stylesheet.fadeExitDone,
  exitActive: stylesheet.fadeExitActive,
};

const MenuItem = ({ label, icon, ...props }) => (
  <Link {...props} className={stylesheet.menuItem}>
    <Icon
      className={stylesheet.icon}
      color="black"
      isClickable={false}
      size={20}
      type={icon}
    />
    <Text className={stylesheet.text} color="black">
      {label}
    </Text>
  </Link>
);

export default class Menu extends Component {
  constructor (props) {
    super(props);

    this.mousetrap = new Mousetrap();
    this.mousetrap.bind(ESCAPE, this.handleEscape);
  }

  handleEscape = () => {
    const { isOpen } = this.props;

    if (isOpen) {
      this.handleOutsideClick();
    }
  };

  handleOutsideClick = () => {
    this.props.onClose();
  };

  render () {
    const { className, isOpen, items, onClose } = this.props;

    return (
      <Fragment>
        {isOpen && (
          <div
            className={stylesheet.overlay}
            onClick={this.handleOutsideClick}
          />
        )}
        <CSSTransition
          classNames={TRANSITION_CLASSES}
          in={isOpen}
          mountOnEnter={true}
          unmountOnExit={true}
          timeout={TIMEOUT}
        >
          <div className={classNames([stylesheet.container, className])}>
            <div className={stylesheet.menuIcon}>
              <Icon type="menu" color="black" onClick={onClose} />
            </div>
            <div className={stylesheet.menuItems}>
              {items.map((item, i) => (
                <MenuItem key={i} {...item} />
              ))}
            </div>
          </div>
        </CSSTransition>
      </Fragment>
    );
  }
}
