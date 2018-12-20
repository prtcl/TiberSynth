import React, { Component } from 'react';
import Mousetrap from 'mousetrap';
import compose from '../../lib/compose';
import withParameterSpace from '../../hoc/withParameterSpace';
import withSynthesisEngine from '../../hoc/withSynthesisEngine';

const SHORTCUTS = {
  RANDOMIZE: 'r',
  UNDO: 'w',
  REDO: 'e',
};

const withGestureWiring = () => Comp =>
  class WithSynthesisWiring extends Component {
    constructor (props) {
      super(props);

      this.mousetrap = new Mousetrap();
      this.mousetrap.bind(SHORTCUTS.RANDOMIZE, this.randomize);
      this.mousetrap.bind(SHORTCUTS.UNDO, this.undo);
      this.mousetrap.bind(SHORTCUTS.REDO, this.redo);
    }

    componentWillUnmount () {
      this.mousetrap.reset();
    }

    componentDidUpdate (prevProps) {
      const { isPlaying, synthEngine, synthesisValues, volume } = this.props;

      if (synthesisValues !== prevProps.synthesisValues) {
        synthEngine.updateValues(synthesisValues);
      }

      if (isPlaying !== prevProps.isPlaying) {
        if (isPlaying) {
          synthEngine.play();
        } else {
          synthEngine.stop();
        }
      }

      if (volume !== prevProps.volume) {
        synthEngine.setVolume(volume);
      }
    }

    randomize = () => {
      this.props.onRandomize();
      return false;
    };

    undo = () => {
      this.props.onUndo();
      return false;
    };

    redo = () => {
      this.props.onRedo();
      return false;
    };

    render () {
      return <Comp {...this.props} />;
    }
  };

export default compose(
  withSynthesisEngine(),
  withParameterSpace(),
  withGestureWiring()
);
