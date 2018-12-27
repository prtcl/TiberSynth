import React, { Component } from 'react';
import Mousetrap from '../../../lib/mousetrap';
import { clamp } from '../../../lib/math';

const SHORTCUTS = {
  FORWARD: 'right',
  BACK: 'left',
};

const withPageContent = ({ pages = [] } = {}) => Comp =>
  class WithPageContent extends Component {
    state = {
      pageIndex: 0,
      pages,
    };

    constructor (props) {
      super(props);

      this.mousetrap = new Mousetrap();
      this.mousetrap.bind(SHORTCUTS.FORWARD, this.forward);
      this.mousetrap.bind(SHORTCUTS.BACK, this.back);
    }

    componentWillUnmount () {
      this.mousetrap.reset();
    }

    getPageContent () {
      const { pageIndex, pages } = this.state;
      const pageContent = pages[pageIndex];
      const next = pages[pageIndex + 1];
      const prev = pages[pageIndex - 1];

      return { pageContent, next, prev };
    }

    page (offset) {
      const { pageIndex, pages } = this.state;
      const updatedPageIndex = clamp(pageIndex + offset, 0, pages.length - 1);

      this.setState({ pageIndex: updatedPageIndex });
    }

    forward = () => {
      this.page(1);
    };

    back = () => {
      this.page(-1);
    };

    render () {
      return (
        <Comp
          {...this.props}
          {...this.state}
          {...this.getPageContent()}
          onBack={this.back}
          onForward={this.forward}
        />
      );
    }
  };

export default withPageContent;
