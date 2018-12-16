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
  containerRef = React.createRef();

  handleMouseDown = () => {
    this.props.onDown();
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
