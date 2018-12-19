import React, { Component } from 'react';
import SynthEngine, { isCompatibleBrowser } from '../lib/SynthEngine';

const { Consumer, Provider } = React.createContext();

const DEFAULT_STATE = {
  analyser: null,
  isCompatibleBrowser: false,
  synthEngine: null,
  synthEngineError: null,
};

const getSynthEngine = () => {
  if (!isCompatibleBrowser()) {
    return {
      ...DEFAULT_STATE,
      synthEngineError: new Error('Browser does not support the Web Audio API'),
    };
  }

  let synthEngine;

  try {
    synthEngine = new SynthEngine();
  } catch (err) {
    console.error(err);

    return {
      ...DEFAULT_STATE,
      synthEngineError: err,
    };
  }

  if (process.env.NODE_ENV === 'development') {
    window.__synthEngine = synthEngine;
  }

  return {
    ...DEFAULT_STATE,
    analyser: synthEngine.getAnalyzer(),
    isCompatibleBrowser: true,
    synthEngine,
  };
};

export const withSynthesisEngineProvider = () => Comp =>
  class SynthesisEngine extends Component {
    state = { ...getSynthEngine() };

    render () {
      return (
        <Provider value={this.state}>
          <Comp {...this.props} />
        </Provider>
      );
    }
  };

const withSynthesisEngine = () => Comp => {
  const WithSynthesisEngine = props => (
    <Consumer>
      {synthEngineProps => <Comp {...props} {...synthEngineProps} />}
    </Consumer>
  );

  return WithSynthesisEngine;
};

export default withSynthesisEngine;
