import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import Link from '../Link';
import Modal from '../Modal';
import Text from '../Text';
import { SPACING } from '../../lib/constants';
import stylesheet from './FieldWrapper.less';

const HELP_WIDTH = SPACING * 36;

class FieldWrapper extends Component {
  state = {
    shouldShowHelp: false,
  };

  showHelpModal = () => {
    this.setState({ shouldShowHelp: true });
  };

  closeHelpModal = () => {
    this.setState({ shouldShowHelp: false });
  };

  render () {
    const { children, className, label, right, help } = this.props;
    const { shouldShowHelp } = this.state;

    return (
      <Fragment>
        <div className={classNames(stylesheet.container, className)}>
          <div className={stylesheet.labelContainer}>
            <Text className={stylesheet.label} color="white">
              {label}
              {help && (
                <Link onClick={this.showHelpModal}>
                  <Text className={stylesheet.help} color="gray">
                    ?
                  </Text>
                </Link>
              )}
            </Text>
            {right && (
              <Text className={stylesheet.value} color="gray">
                {right}
              </Text>
            )}
          </div>
          <div>{children}</div>
        </div>
        {help && (
          <Modal
            isOpen={shouldShowHelp}
            onClose={this.closeHelpModal}
            width={HELP_WIDTH}
          >
            <Text color="white">{help}</Text>
          </Modal>
        )}
      </Fragment>
    );
  }
}

export default FieldWrapper;
