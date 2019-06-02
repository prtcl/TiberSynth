import React, { Component, Fragment } from 'react';
import {
  Handles as RCHandles,
  Rail as RCRail,
  Slider as RCSlider,
  Tracks as RCTracks,
} from 'react-compound-slider';
import FieldWrapper from '../FieldWrapper';
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

  render () {
    const { label, step } = this.props;
    const value = this.getValue();
    const domain = this.getDomain();
    const formattedValue = this.getFormattedValue();

    return (
      <FieldWrapper label={label} right={formattedValue}>
        <div className={stylesheet.sliderContainer}>
          <RCSlider
            className={stylesheet.slider}
            domain={domain}
            onChange={this.handleChange}
            onUpdate={this.handleUpdate}
            step={step}
            values={value}
          >
            <RCRail>
              {({ getRailProps }) => (
                <div {...getRailProps()} className={stylesheet.railContainer}>
                  <div className={stylesheet.rail} />
                </div>
              )}
            </RCRail>
            <RCTracks right={false}>
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
            <RCHandles>
              {({ handles, getHandleProps }) => (
                <Fragment>
                  {handles.map(handle => (
                    <Handle
                      key={handle.id}
                      {...handle}
                      {...getHandleProps(handle.id)}
                    />
                  ))}
                </Fragment>
              )}
            </RCHandles>
          </RCSlider>
        </div>
      </FieldWrapper>
    );
  }
}
