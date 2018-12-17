import React, { Component } from 'react';
import Text from '../Text';
import stylesheet from './Slider.less';

export default class Slider extends Component {
  static defaultProps = {
    color: 'white',
    max: 1,
    min: 0,
    onChange: () => null,
    step: 0.1,
    value: 0,
  };

  handleChange = e => {
    this.props.onChange(e.target.value);
  };

  renderLabel () {
    const { color, label } = this.props;

    return (
      <Text className={stylesheet.label} color={color}>
        {label}
      </Text>
    );
  }

  renderSlider () {
    const { label, min, max, step, value } = this.props;

    return (
      <div className={stylesheet.slider}>
        <input
          className={stylesheet.input}
          max={max}
          min={min}
          name={label}
          onChange={this.handleChange}
          step={step}
          type="range"
          value={value}
        />
      </div>
    );
  }

  render () {
    return (
      <div className={stylesheet.container}>
        {this.renderLabel()}
        {this.renderSlider()}
      </div>
    );
  }
}
