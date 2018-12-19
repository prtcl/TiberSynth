import React, { Component } from 'react';
import {
  alpha,
  bindHelpers,
  clear,
  fill,
  rect,
  stroke,
  strokeWeight,
} from './lib/helpers';

export default class Canvas extends Component {
  state = {
    canvas: null,
    context: null,
    isReady: false,
  };

  canvasRef = React.createRef();

  componentDidUpdate () {
    const { isReady } = this.state;

    if (this.canvasRef && this.canvasRef.current && !isReady) {
      this.initCanvas();
      this.renderTick();
    }
  }

  initCanvas () {
    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');
    const helpers = bindHelpers(context, {
      alpha,
      clear,
      fill,
      rect,
      stroke,
      strokeWeight,
    });

    this.setState({
      canvas,
      context,
      height: canvas.height,
      helpers,
      isReady: true,
      width: canvas.width,
    });
  }

  renderTick () {
    const { loop, draw } = this.props;
    const { helpers, width, height, isReady } = this.state;

    requestAnimationFrame(() => {
      if (!isReady) {
        return this.renderTick();
      }

      draw({ width, height }, helpers);

      if (loop) {
        this.renderTick();
      }
    });
  }

  render () {
    return (
      <canvas ref={this.canvasRef} style={{ width: '100%', height: '100%' }} />
    );
  }
}
