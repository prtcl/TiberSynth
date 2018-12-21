import React, { Component, Fragment } from 'react';
import {
  Handles as RCHandles,
  Rail as RCRail,
  Slider as RCSlider,
  Tracks as RCTracks,
} from 'react-compound-slider';
import Text from '../Text';
import stylesheet from './Slider.less';

const Handle = ({ percent, ...props }) => (
  <div
    {...props}
    className={stylesheet.handleContainer}
    style={{ left: `${percent}%` }}
  >
    <div className={stylesheet.handle} />
  </div>
);

const Handles = props => (
  <RCHandles {...props}>
    {({ handles, getHandleProps }) => (
      <Fragment>
        {handles.map(handle => (
          <Handle key={handle.id} {...handle} {...getHandleProps(handle.id)} />
        ))}
      </Fragment>
    )}
  </RCHandles>
);

const Track = ({ source, target, ...props }) => (
  <div
    {...props}
    className={stylesheet.trackContainer}
    style={{
      left: `${source.percent}%`,
      width: `${target.percent - source.percent}%`,
    }}
  >
    <div className={stylesheet.track} />
  </div>
);

const Tracks = props => (
  <RCTracks {...props} right={false}>
    {({ tracks, getTrackProps }) => (
      <Fragment>
        {tracks.map(({ id, source, target }) => (
          <Track
            {...getTrackProps()}
            key={id}
            source={source}
            target={target}
          />
        ))}
      </Fragment>
    )}
  </RCTracks>
);

const Rail = props => (
  <RCRail {...props}>
    {({ getRailProps }) => (
      <div {...getRailProps()} className={stylesheet.railContainer}>
        <div className={stylesheet.rail} />
      </div>
    )}
  </RCRail>
);

const defaultValueFormatter = value => `${Math.round(value * 100)}%`;

export default class Slider extends Component {
  state = {
    value: this.props.value,
  };

  static defaultProps = {
    max: 1,
    min: 0,
    onChange: () => null,
    step: 0.01,
    value: 0,
    valueFormatter: defaultValueFormatter,
  };

  getValue () {
    return [this.props.value];
  }

  getFormattedValue () {
    const { valueFormatter } = this.props;
    const { value } = this.state;

    return valueFormatter(value);
  }

  getDomain () {
    const { min, max } = this.props;

    return [min, max];
  }

  handleChange = ([value]) => {
    this.props.onChange(value);
  };

  handleUpdate = ([value]) => {
    this.setState({ value });
  };

  renderLabel () {
    const { label } = this.props;
    const value = this.getFormattedValue();

    return (
      <div className={stylesheet.labelContainer}>
        <Text className={stylesheet.label} color="white">
          {label}
        </Text>
        <Text className={stylesheet.value} color="gray">
          {value}
        </Text>
      </div>
    );
  }

  renderSlider () {
    const { step } = this.props;
    const value = this.getValue();
    const domain = this.getDomain();

    return (
      <div className={stylesheet.sliderContainer}>
        <RCSlider
          className={stylesheet.slider}
          domain={domain}
          onChange={this.handleChange}
          onUpdate={this.handleUpdate}
          step={step}
          values={value}
        >
          <Rail />
          <Tracks />
          <Handles />
        </RCSlider>
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
