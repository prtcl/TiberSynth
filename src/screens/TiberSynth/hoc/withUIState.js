import React, { Component } from 'react';

const withUIState = () => Comp =>
  class WithUIState extends Component {
    state = {
      currentModal: null,
      shouldShowMenu: false,
    };

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
