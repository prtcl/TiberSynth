import React, { Component } from 'react';
import { calculateDistance, flip, rand } from '../lib/math';
import {
  getInitialPoints,
  getInitialSynthesisValues,
  VALUE_MAPPERS,
} from '../lib/parameterSpace';

const { Consumer, Provider } = React.createContext();

const INITIAL_STATE = () => ({
  history: [],
  isPlaying: false,
  points: getInitialPoints(),
  position: { x: 0, y: 0 },
  synthsisValues: getInitialSynthesisValues(),
});

export const withParameterSpaceProvider = () => Comp =>
  class ParameterSpace extends Component {
    state = { ...INITIAL_STATE() };

    componentDidMount () {
      this.randomize();
    }

    randomize () {
      const { points } = this.state;

      const updatedPoints = points.map(point => {
        return {
          ...point,
          x: rand(),
          y: rand(),
          weight: rand(),
        };
      });

      this.setState({ points: updatedPoints }, () => {
        this.move(this.state.position);
      });
    }

    move = ({ x, y }) => {
      const { points } = this.state;
      const position = { x, y };

      const updatedPoints = points.map(point => {
        const distance = calculateDistance(point, position);
        const value = point.weight * flip(distance);

        return {
          ...point,
          distance,
          value,
        };
      });

      const updatedSynthesisValues = updatedPoints.reduce((res, point) => {
        const mapper = VALUE_MAPPERS[point.id];
        const value = mapper(point.value);

        return {
          ...res,
          [point.id]: value,
        };
      }, {});

      this.setState({
        points: updatedPoints,
        position,
        synthsisValues: updatedSynthesisValues,
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
