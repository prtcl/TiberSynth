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
  history: [],
  isPlaying: false,
  points: getInitialPoints(),
  position: { x: 0, y: 0 },
  oscillators: getInitialOscillators(),
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

    randomize () {
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
    }

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

    getParameterSpaceProps () {
      return {
        ...this.state,
        onMove: this.move,
        onPlay: this.play,
        onRandomize: this.randomize,
        onStop: this.stop,
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
