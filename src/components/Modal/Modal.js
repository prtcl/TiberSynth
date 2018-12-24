import React, { Component } from 'react';
import Mousetrap from 'mousetrap';
import { CSSTransition } from 'react-transition-group';
import Icon from '../Icon';
import stylesheet from './Modal.less';

const ESCAPE = 'esc';

const TIMEOUT = {
  enter: 55,
  exit: 75,
};

const TRANSITION_CLASSES = {
  enter: stylesheet.fadeEnter,
  enterActive: stylesheet.fadeEnterActive,
  exit: stylesheet.fadeExitDone,
  exitActive: stylesheet.fadeExitActive,
};

export default class Modal extends Component {
  static defaultProps = {
    width: 500,
  };

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
    const { onClose } = this.props;

    if (onClose) {
      onClose();
    }
  };

  render () {
    const { children, isOpen, onClose, width } = this.props;

    return (
      <CSSTransition
        classNames={TRANSITION_CLASSES}
        in={isOpen}
        mountOnEnter={true}
        unmountOnExit={true}
        timeout={TIMEOUT}
      >
        <div className={stylesheet.wrapper}>
          <div
            className={stylesheet.overlay}
            onClick={this.handleOutsideClick}
          />
          <div className={stylesheet.container} style={{ maxWidth: width }}>
            {onClose && (
              <div className={stylesheet.header}>
                <Icon
                  className={stylesheet.icon}
                  type="down"
                  onClick={onClose}
                  color="white"
                />
              </div>
            )}
            <div className={stylesheet.content}>{children}</div>
          </div>
        </div>
      </CSSTransition>
    );
  }
}
