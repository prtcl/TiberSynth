import React, { Component } from 'react';
import AudioWrapper from '../lib/AudioWrapper';
import Mousetrap from '../../../lib/mousetrap';
import MediaRecorder from '../../../lib/MediaRecorder';

const EMPTY = 'EMPTY';
const PAUSED = 'PAUSED';
const PLAYING = 'PLAYING';
const RECORDING = 'RECORDING';

export const RECORDER_MODES = {
  EMPTY,
  PAUSED,
  PLAYING,
  RECORDING,
};

const SHORTCUTS = {
  TOGGLE_RECORD: 'space',
};

const createMediaRecorder = ({ isCompatibleBrowser, mediaStream }, events) => {
  if (!isCompatibleBrowser) {
    return;
  }

  const options = { mimeType: 'audio/wav' };
  const recorder = new MediaRecorder(mediaStream, options);

  Object.entries(events).forEach(([name, handler]) => {
    recorder.addEventListener(name, handler);
  });

  return recorder;
};

const createMousetrap = events => {
  const mousetrap = new Mousetrap();

  Object.entries(events).forEach(([name, handler]) => {
    mousetrap.bind(name, handler);
  });

  return mousetrap;
};

const INITIAL_STATE = () => ({
  recordingError: null,
  recordingMode: EMPTY,
  waveData: null,
});

const withMediaRecorder = () => Comp =>
  class WithMediaRecorder extends Component {
    state = { ...INITIAL_STATE() };

    constructor (props) {
      super(props);

      this.recorderEvents = {
        dataavailable: this.handleDataAvailable,
        error: this.handleRecorderError,
        start: this.handleRecorderStart,
        stop: this.handleRecorderStop,
      };

      this.keyboardEvents = {
        [SHORTCUTS.TOGGLE_RECORD]: this.toggleRecord,
      };

      this.audio = new AudioWrapper();
      this.recorder = createMediaRecorder(props, this.recorderEvents);
      this.mousetrap = createMousetrap(this.keyboardEvents);
    }

    componentWillUnmount () {
      Object.entries(this.recorderEvents).forEach(([name, handler]) => {
        this.recorder.removeEventListener(name, handler);
      });

      if (this.recorder.state !== 'inactive') {
        this.recorder.stop();
      }

      this.audio.clear();
      this.mousetrap.reset();

      delete this.audio;
      delete this.recorder;
      delete this.mousetrap;
    }

    handleDataAvailable = e => {
      const { data: waveData } = e;

      if (waveData) {
        this.audio.setSource(waveData);
        this.setState({ waveData });
      }
    };

    handleRecorderStart = () => {
      this.setState({ recordingMode: RECORDING });
    };

    handleRecorderStop = () => {
      this.setState({ recordingMode: PAUSED });
    };

    handleRecorderError = e => {
      this.setState({ recordingError: e });
    };

    toggleRecord = () => {
      const { recordingMode } = this.state;

      if (recordingMode === EMPTY) {
        this.record();
      }

      if (recordingMode === RECORDING || recordingMode === PLAYING) {
        this.pause();
      }

      if (recordingMode === PAUSED) {
        this.play();
      }
    };

    clear = () => {
      this.audio.clear();
      this.recorder = createMediaRecorder(this.props, this.recorderEvents);
      this.setState({ ...INITIAL_STATE() });
    };

    play = async () => {
      await this.audio.play();
      this.setState({ recordingMode: PLAYING });
    };

    pause = async () => {
      const { recordingMode } = this.state;

      if (recordingMode === RECORDING) {
        this.recorder.stop();
      }

      if (recordingMode === PLAYING) {
        this.audio.stop();
        this.setState({ recordingMode: PAUSED });
      }
    };

    record = () => {
      this.recorder.start();
    };

    download = () => {
      console.log('download');
    };

    getMediaRecorderProps () {
      return {
        ...this.state,
        onClear: this.clear,
        onDownload: this.download,
        onPause: this.pause,
        onPlay: this.play,
        onRecord: this.record,
      };
    }

    render () {
      return <Comp {...this.props} {...this.getMediaRecorderProps()} />;
    }
  };

export default withMediaRecorder;
