import React, { Component } from 'react';
import { calculateDistance, flip, rand } from '../lib/math';
import {
  VALUE_MAPPERS,
  getInitialOscillators,
  getInitialPoints,
  getInitialSynthesisValues,
} from '../lib/parameterSpace';

const { Consumer, Provider } = React.createContext();

const INITIAL_STATE = () => ({
  feedbackRange: 0.8,
  filterRange: 0.8,
  history: [],
  isPlaying: false,
  noiseRange: 0.8,
  oscillators: getInitialOscillators(),
  points: getInitialPoints(),
  position: { x: 0, y: 0 },
  synthesisValues: getInitialSynthesisValues(),
});

export const withParameterSpaceProvider = () => Comp =>
  class ParameterSpace extends Component {
    state = { ...INITIAL_STATE() };

    componentDidMount () {
      this.randomize();

      window.addEventListener('keydown', e => {
        if (e.which === 82) {
          this.randomize();
        }
      });
    }

    randomize = () => {
      const { oscillators, points } = this.state;

      const updatedPoints = points.map(point => {
        return {
          ...point,
          x: rand(-1, 1),
          y: rand(-1, 1),
          weight: rand(0, 1),
        };
      });

      const updatedOscillators = oscillators.map(oscillator => {
        return {
          ...oscillator,
          value: rand(0, 1),
        };
      });

      this.setState(
        { oscillators: updatedOscillators, points: updatedPoints },
        () => {
          this.move(this.state.position);
        }
      );
    };

    undo = () => {
      console.log('undo');
    };

    redo = () => {
      console.log('redo');
    };

    move = ({ x, y }) => {
      const { oscillators, points, synthesisValues } = this.state;
      const position = { x: x * 2 - 1, y: y * 2 - 1 };

      const updatedPoints = points.map(point => {
        const distance = calculateDistance(point, position);
        const value = point.weight * flip(distance);

        return {
          ...point,
          distance,
          value,
        };
      });

      const updatedSynthesisValues = [...oscillators, ...updatedPoints].reduce(
        (res, parameter) => {
          const mapper = VALUE_MAPPERS[parameter.id];
          const value = mapper(parameter.value);

          return {
            ...res,
            [parameter.id]: value,
          };
        },
        synthesisValues
      );

      this.setState({
        points: updatedPoints,
        position,
        synthesisValues: updatedSynthesisValues,
      });
    };

    play = () => {
      this.setState({ isPlaying: true });
    };

    stop = () => {
      this.setState({ isPlaying: false });
    };

    updateFeedback = value => {
      this.setState({ feedbackRange: value });
    };

    updateNoise = value => {
      this.setState({ noiseRange: value });
    };

    updateFilter = value => {
      this.setState({ filterRange: value });
    };

    getParameterSpaceProps () {
      return {
        ...this.state,
        onChangeFeedback: this.updateFeedback,
        onChangeFilter: this.updateFilter,
        onChangeNoise: this.updateNoise,
        onMove: this.move,
        onPlay: this.play,
        onRandomize: this.randomize,
        onRedo: this.redo,
        onStop: this.stop,
        onUndo: this.undo,
      };
    }

    render () {
      return (
        <Provider value={this.getParameterSpaceProps()}>
          <Comp {...this.props} />
        </Provider>
      );
    }
  };

const withParameterSpace = () => Comp => {
  const WithParameterSpace = props => (
    <Consumer>
      {parameterSpaceProps => <Comp {...props} {...parameterSpaceProps} />}
    </Consumer>
  );

  return WithParameterSpace;
};

export default withParameterSpace;
