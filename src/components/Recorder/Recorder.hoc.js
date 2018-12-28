import React, { Component } from 'react';
import compose from '../../lib/compose';
import Mousetrap from '../../lib/mousetrap';
import withSynthesisEngine from '../../hoc/withSynthesisEngine';
import { MODES } from './lib/constants';

const SHORTCUTS = {
  TOGGLE_RECORD: 'space',
};

const withMediaRecorder = () => Comp =>
  class MediaRecorder extends Component {
    state = {
      recordingMode: MODES.EMPTY,
    };

    constructor (props) {
      super(props);

      this.mousetrap = new Mousetrap();
      this.mousetrap.bind(SHORTCUTS.TOGGLE_RECORD, this.toggleRecord);
    }

    toggleRecord = () => {
      const { recordingMode } = this.state;

      if (recordingMode === MODES.EMPTY) {
        this.record();
      }

      if (
        recordingMode === MODES.RECORDING
        || recordingMode === MODES.PLAYING
      ) {
        this.pause();
      }

      if (recordingMode === MODES.PAUSED) {
        this.play();
      }
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
