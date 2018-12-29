import React, { Component } from 'react';
import classNames from 'classnames';
import Mousetrap from '../../lib/mousetrap';
import { CSSTransition } from 'react-transition-group';
import Button from '../Button';
import Icon from '../Icon';
import Text from '../Text';
import { SPACING } from '../../lib/constants';
import stylesheet from './Modal.less';

const ESCAPE = 'esc';

const TIMEOUT = {
  enter: 55,
  exit: 75,
};

const DEFAULT_WIDTH = SPACING * 32;

const TRANSITION_CLASSES = {
  enter: stylesheet.fadeEnter,
  enterActive: stylesheet.fadeEnterActive,
  exit: stylesheet.fadeExitDone,
  exitActive: stylesheet.fadeExitActive,
};

export default class Modal extends Component {
  static defaultProps = {
    width: DEFAULT_WIDTH,
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

  renderHeader () {
    const { onClose } = this.props;

    if (!onClose) {
      return null;
    }

    return (
      <div className={stylesheet.header}>
        <Icon
          className={stylesheet.icon}
          type="down"
          onClick={onClose}
          color="white"
        />
      </div>
    );
  }

  renderTitle () {
    const { title } = this.props;

    if (!title) {
      return null;
    }

    return (
      <div className={stylesheet.title}>
        <Text className={stylesheet.text} color="white" type="title">
          {title}
        </Text>
      </div>
    );
  }

  renderActions () {
    const { actions } = this.props;

    if (!actions) {
      return null;
    }

    return (
      <div className={stylesheet.actions}>
        {actions.map((action, index) => (
          <Button key={index} {...action} className={stylesheet.button} />
        ))}
      </div>
    );
  }

  render () {
    const { children, isOpen, width, type } = this.props;

    const containerClasses = classNames([
      stylesheet.container,
      type === 'error' && stylesheet.error,
    ]);

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
          <div className={containerClasses} style={{ maxWidth: width }}>
            {this.renderHeader()}
            {this.renderTitle()}
            <div className={stylesheet.content}>{children}</div>
            {this.renderActions()}
          </div>
        </div>
      </CSSTransition>
    );
  }
}
