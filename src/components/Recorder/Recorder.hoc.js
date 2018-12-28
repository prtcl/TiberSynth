import React, { Component } from 'react';
import compose from '../../lib/compose';
import Mousetrap from '../../lib/mousetrap';
import withSynthesisEngine from '../../hoc/withSynthesisEngine';
import MediaRecorder from '../../lib/MediaRecorder';
import { MODES } from './lib/constants';

const SHORTCUTS = {
  TOGGLE_RECORD: 'space',
};

const withMediaRecorder = () => Comp =>
  class WithMediaRecorder extends Component {
    state = {
      recordingMode: MODES.EMPTY,
    };

    constructor (props) {
      super(props);

      this.initMediaRecorder();
      this.initKeyboardEvents();
    }

    componentWillUnmount () {
      this.removeMediaRecorderListeners();
      this.removeKeyboardListeners();
    }

    initMediaRecorder () {
      const { isCompatibleBrowser, mediaStream } = this.props;

      if (!isCompatibleBrowser) {
        return;
      }

      const options = { mimeType: 'audio/wav' };

      this.recorder = new MediaRecorder(mediaStream, options);

      this.recorder.addEventListener('dataavailable', this.handleDataAvailable);
      this.recorder.addEventListener('start', this.handleRecorderStart);
      this.recorder.addEventListener('stop', this.handleRecorderStop);
      this.recorder.addEventListener('error', err => console.error(err));
    }

    initKeyboardEvents () {
      this.mousetrap = new Mousetrap();
      this.mousetrap.bind(SHORTCUTS.TOGGLE_RECORD, this.toggleRecord);
    }

    removeKeyboardListeners () {
      this.mousetrap.reset();
    }

    removeMediaRecorderListeners () {
      if (!this.recorder) {
        return;
      }

      this.recorder.removeEventListner(
        'dataavailable',
        this.handleDataAvailable
      );
      this.recorder.removeEventListner('start', this.handleRecorderStart);
      this.recorder.removeEventListner('stop', this.handleRecorderStop);
    }

    handleDataAvailable = e => {
      console.log('dataavailable', e);
    };

    handleRecorderStart = e => {
      console.log('start', e);
    };

    handleRecorderStop = e => {
      console.log('stop', e);
    };

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
      const { recordingMode } = this.state;

      if (recordingMode === MODES.RECORDING) {
        this.recorder.stop();
      }

      if (recordingMode === MODES.PLAYING) {
        console.log('stop playback');
      }

      this.setRecordingMode(MODES.PAUSED);
    };

    record = () => {
      this.recorder.start();
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
