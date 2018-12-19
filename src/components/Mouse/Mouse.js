import React, { Component } from 'react';

const STYLE = { width: '100%', height: '100%' };

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

  handleMouseDown = () => {
    this.props.onDown();
  };

  handleMouseEnter = () => {
    this.props.onEnter();
  };

  handleMouseLeave = () => {
    this.props.onLeave();
  };

  handleMouseUp = () => {
    this.props.onUp();
  };

  handleMouseMove = e => {
    const { onMove } = this.props;
    const coords = getMouseCoordinates(e, this.containerRef);

    onMove(coords);
  };

  render () {
    const { children } = this.props;

    return (
      <div
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        ref={this.containerRef}
        style={STYLE}
      >
        {children}
      </div>
    );
  }
}
