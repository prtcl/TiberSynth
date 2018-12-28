import React, { Component } from 'react';
import compose from '../../lib/compose';
import withSynthesisEngine from '../../hoc/withSynthesisEngine';
import { MODES } from './lib/constants';

const withMediaRecorder = () => Comp =>
  class MediaRecorder extends Component {
    state = {
      recordingMode: MODES.EMPTY,
    };

    setRecordingMode = recordingMode => {
      this.setState({ recordingMode });
    };

    clear = () => {
      this.setRecordingMode(MODES.EMPTY);
    };

    play = () => {
      this.setRecordingMode(MODES.PLAYING);
    };

    pause = () => {
      this.setRecordingMode(MODES.PAUSED);
    };

    record = () => {
      this.setRecordingMode(MODES.RECORDING);
    };

    download = () => {
      console.log('download');
    };

    render () {
      return (
        <Comp
          {...this.props}
          {...this.state}
          onClear={this.clear}
          onDownload={this.download}
          onPause={this.pause}
          onPlay={this.play}
          onRecord={this.record}
        />
      );
    }
  };

export default compose(
  withSynthesisEngine(),
  withMediaRecorder()
);
