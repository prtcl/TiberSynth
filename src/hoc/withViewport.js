import React, { Component } from 'react';
import throttle from 'lodash/throttle';
import { MOBILE_BREAKPOINT } from '../lib/constants';

const { Consumer, Provider } = React.createContext();

const getWindowDimensions = () => ({
  windowHeight: window.innerHeight,
  windowWidth: window.innerWidth,
});

const getMediaQueries = () => {
  const query = `(max-width: ${MOBILE_BREAKPOINT}px)`;
  const isMobile = window.matchMedia(query).matches;
  const windowDimensions = getWindowDimensions();

  return {
    ...windowDimensions,
    isMobile,
  };
};

const THROTTLE_LIMIT = 50;

export const withViewportProvider = () => Comp =>
  class Viewport extends Component {
    state = { ...getMediaQueries() };

    constructor (props) {
      super(props);

      window.addEventListener(
        'resize',
        throttle(this.handleResize),
        THROTTLE_LIMIT
      );
    }

    handleResize = () => {
      this.setState({ ...getMediaQueries() });
    };

    render () {
      return (
        <Provider value={{ ...this.state }}>
          <Comp {...this.props} {...this.state} />
        </Provider>
      );
    }
  };

const withViewport = () => Comp => {
  const WithViewport = props => (
    <Consumer>
      {viewportProps => <Comp {...props} {...viewportProps} />}
    </Consumer>
  );

  return WithViewport;
};

export default withViewport;
