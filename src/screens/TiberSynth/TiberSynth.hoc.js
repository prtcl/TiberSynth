import React, { Component } from 'react';
import compose from '../../lib/compose';
import withParameterSpace from '../../hoc/withParameterSpace';
import withSynthesisEngine from '../../hoc/withSynthesisEngine';

const withGestureWiring = () => Comp =>
  class WithSynthesisWiring extends Component {
    componentDidUpdate (prevProps) {
      const { isPlaying, synthEngine, synthesisValues } = this.props;

      synthEngine.updateValues(synthesisValues);

      if (isPlaying !== prevProps.isPlaying) {
        if (isPlaying) {
          synthEngine.play();
        } else {
          synthEngine.stop();
        }
      }
    }

    render () {
      return <Comp {...this.props} />;
    }
  };

export default compose(
  withSynthesisEngine(),
  withParameterSpace(),
  withGestureWiring()
);
