import React, { Component } from 'react';
import { NAME as UNSUPPORTED } from '../components/Unsupported';

const withUIState = () => Comp =>
  class WithUIState extends Component {
    state = {
      currentModal: null,
      shouldShowMenu: false,
    };

    componentDidMount () {
      const { isCompatibleBrowser, isMobile } = this.props;

      if (isMobile || !isCompatibleBrowser) {
        this.setState({ currentModal: UNSUPPORTED });
      }
    }

    openMenu = () => {
      this.setState({ shouldShowMenu: true });
    };

    closeMenu = () => {
      this.setState({ shouldShowMenu: false });
    };

    showModal = modal => {
      this.setState({ currentModal: modal });
      this.closeMenu();
    };

    closeModal = () => {
      this.setState({ currentModal: null });
    };

    render () {
      return (
        <Comp
          {...this.props}
          {...this.state}
          onCloseModal={this.closeModal}
          onCloseNavMenu={this.closeMenu}
          onOpenNavMenu={this.openMenu}
          onShowModal={this.showModal}
        />
      );
    }
  };

export default withUIState;
