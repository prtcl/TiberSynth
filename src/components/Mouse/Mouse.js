import React, { Component } from 'react';
import throttle from 'lodash/throttle';

const STYLE = { width: '100%', height: '100%', overflow: 'hidden' };

const getMouseCoordinates = ({ pageX, pageY }, ref) => {
  if (!ref || !ref.current) {
    return { x: 0, y: 0 };
  }

  const { offsetLeft, offsetWidth, offsetHeight } = ref.current;
  const x = (pageX - offsetLeft) / offsetWidth;
  const y = ((pageY - offsetHeight) * -1) / offsetHeight;

  return { x, y };
};

export default class Mouse extends Component {
  static defaultProps = {
    onDown: () => null,
    onEnter: () => null,
    onLeave: () => null,
    onMove: () => null,
    onUp: () => null,
  };

  containerRef = React.createRef();

  handleDown = () => {
    this.props.onDown();
  };

  handleUp = () => {
    this.props.onUp();
  };

  handleMouseEnter = () => {
    this.props.onEnter();
  };

  handleMouseLeave = () => {
    this.props.onLeave();
  };

  handleMouseMove = e => {
    const coords = getMouseCoordinates(e, this.containerRef);

    this.emitMove(coords);
  };

  handleTouchStart = e => {
    this.handleTouchMove(e);
    this.handleDown();
  };

  handleTouchMove = e => {
    if (!e.touches) {
      return;
    }

    this.handleMouseMove(e.touches[0]);
    e.preventDefault();
  };

  emitMove = throttle(coords => {
    this.props.onMove(coords);
  }, 30);

  render () {
    const { children } = this.props;

    return (
      <div
        onMouseDown={this.handleDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleUp}
        onTouchCancel={this.handleMouseLeave}
        onTouchEnd={this.handleUp}
        onTouchMove={this.handleTouchMove}
        onTouchStart={this.handleTouchStart}
        ref={this.containerRef}
        style={STYLE}
      >
        {children}
      </div>
    );
  }
}
