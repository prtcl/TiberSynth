import React, { Component } from 'react';
import Canvas from '../Canvas';
import { scale } from '../../lib/math';

const RANGE = 200;
const SKIP_MODULO = 4;

export default class Analyser extends Component {
  draw = ({ width, height }, { clear, fill, rect }) => {
    const { analyser } = this.props;
    const data = analyser.getFrequencyData();
    let i = 0;

    clear(width, height);

    while (i < width) {
      if (i % SKIP_MODULO === 0) {
        const d = data[i + 10];
        const n = scale(d, 0, RANGE, 0, height);

        fill(255, 255, 255);
        rect(i, height - n, 2, n);
      }

      i++;
    }
  };

  render () {
    const { height, isCompatibleBrowser } = this.props;

    if (!isCompatibleBrowser) {
      return null;
    }

    return (
      <div style={{ height, position: 'relative' }}>
        <Canvas draw={this.draw} loop={true} />
      </div>
    );
  }
}
