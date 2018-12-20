import React, { Component } from 'react';
import { calculateDistance, clamp, flip, rand } from '../lib/math';
import {
  VALUE_MAPPERS,
  getInitialOscillators,
  getInitialPoints,
  getInitialRanges,
  getInitialSynthesisValues,
} from '../lib/parameterSpace';

const { Consumer, Provider } = React.createContext();

const INITIAL_STATE = () => ({
  history: [],
  historyIndex: 0,
  isPlaying: false,
  oscillators: getInitialOscillators(),
  points: getInitialPoints(),
  position: { x: 0, y: 0 },
  ranges: getInitialRanges(),
  synthesisValues: getInitialSynthesisValues(),
  volume: 0.65,
});

const MAX_HISTORY = 100;

const getHistoryIndex = (offset = 0, { history, historyIndex }) => {
  return clamp(historyIndex + offset, 0, history.length - 1);
};

const getUpdatedSpace = ({
  oscillators,
  points,
  position,
  ranges,
  synthesisValues,
}) => {
  const updatedPoints = points.map(point => {
    const distance = calculateDistance(point, position);
    const value = point.weight * flip(distance);

    return {
      ...point,
      distance,
      value,
    };
  });

  const rangeValues = ranges.reduce(
    (res, range) => ({
      ...res,
      [range.id]: range.value,
    }),
    {}
  );

  const updatedSynthesisValues = [...oscillators, ...updatedPoints].reduce(
    (res, parameter) => {
      const mapper = VALUE_MAPPERS[parameter.id];
      const value = mapper(parameter.value, rangeValues);

      return {
        ...res,
        [parameter.id]: value,
      };
    },
    synthesisValues
  );

  return {
    oscillators,
    points: updatedPoints,
    position,
    rangeValues,
    ranges,
    synthesisValues: updatedSynthesisValues,
  };
};

const getMergedHistory = ({ history, oscillators, points, historyIndex }) => {
  const mergedHistory = [
    ...history,
    {
      oscillators,
      points,
    },
  ];
  const len = mergedHistory.length;
  const slicedHistory = mergedHistory.slice(
    Math.max(0, len - MAX_HISTORY),
    len
  );

  return {
    history: slicedHistory,
    historyIndex,
  };
};

export const withParameterSpaceProvider = () => Comp =>
  class ParameterSpace extends Component {
    state = { ...INITIAL_STATE() };

    componentDidMount () {
      this.randomize();
    }

    randomize = () => {
      const { oscillators, points, history } = this.state;
      const historyIndex = Math.min(history.length, MAX_HISTORY - 1);

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

      this.setState({
        ...getUpdatedSpace({
          ...this.state,
          points: updatedPoints,
          oscillators: updatedOscillators,
        }),
        ...getMergedHistory({
          history,
          oscillators: updatedOscillators,
          points: updatedPoints,
          historyIndex,
        }),
      });
    };

    move = ({ x, y }) => {
      const updatedPosition = { x: x * 2 - 1, y: y * 2 - 1 };

      this.setState({
        ...getUpdatedSpace({
          ...this.state,
          position: updatedPosition,
        }),
      });
    };

    history = offset => {
      const { history } = this.state;
      const historyIndex = getHistoryIndex(offset, this.state);

      if (historyIndex === this.state.historyIndex) {
        return;
      }

      const { oscillators, points } = history[historyIndex];

      this.setState({
        ...getUpdatedSpace({ ...this.state, oscillators, points }),
        historyIndex,
      });
    };

    undo = () => {
      this.history(-1);
    };

    redo = () => {
      this.history(1);
    };

    play = () => {
      this.setState({ isPlaying: true });
    };

    stop = () => {
      this.setState({ isPlaying: false });
    };

    updateRangeValue = (value, id) => {
      const { ranges } = this.state;

      const updatedRanges = ranges.map(range => {
        if (range.id !== id) {
          return range;
        }

        return {
          ...range,
          value,
        };
      });

      this.setState({
        ...getUpdatedSpace({ ...this.state, ranges: updatedRanges }),
      });
    };

    updateVolume = value => {
      this.setState({ volume: value });
    };

    getParameterSpaceProps () {
      return {
        ...this.state,
        onChangeVolume: this.updateVolume,
        onMove: this.move,
        onPlay: this.play,
        onRandomize: this.randomize,
        onRedo: this.redo,
        onStop: this.stop,
        onUndo: this.undo,
        onUpdateRangeValue: this.updateRangeValue,
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
