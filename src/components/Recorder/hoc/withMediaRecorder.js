import React, { Component } from 'react';
import FileSaver from 'file-saver';
import AudioWrapper from '../lib/AudioWrapper';
import MediaRecorder from '../../../lib/MediaRecorder';
import Mousetrap from '../../../lib/mousetrap';
import { clamp, flip } from '../../../lib/math';
import { formatDate } from '../../../lib/time';

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

const TIMER_INTERVAL = 1000;

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

const getDownloadFilename = ({ recordingStartTime }) => {
  const date = formatDate(recordingStartTime, 'YYYY_MM_DD-HH_mm');
  const filename = `TiberSynth-${date}`;

  return filename;
};

const INITIAL_STATE = () => ({
  elapsedPlaybackTime: 0,
  elapsedRecordingTime: 0,
  recordingError: null,
  recordingMode: EMPTY,
  recordingStartTime: 0,
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
      this.audio.addEventListener('timeupdate', this.handleAudioTimeUpdate);
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
      this.audio.removeEventListener('timeupdate', this.handleAudioTimeUpdate);
      this.mousetrap.reset();

      clearInterval(this.recordingTimerId);

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

    handleTimerTick = () => {
      const { recordingStartTime } = this.state;
      const elapsedRecordingTime = flip(recordingStartTime - Date.now());

      this.setState({ elapsedRecordingTime });
    };

    handleAudioTimeUpdate = () => {
      const { elapsedRecordingTime } = this.state;
      const elapsedPlaybackTime = clamp(
        this.audio.getCurrentTime(),
        0,
        elapsedRecordingTime
      );

      this.setState({ elapsedPlaybackTime });
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

    play = async () => {
      await this.audio.play();
      this.setState({ elapsedPlaybackTime: 0, recordingMode: PLAYING });
    };

    pause = async () => {
      const { recordingMode } = this.state;

      if (recordingMode === RECORDING) {
        clearInterval(this.recordingTimerId);
        this.recorder.stop();
      }

      if (recordingMode === PLAYING) {
        this.audio.stop();
        this.setState({ recordingMode: PAUSED });
      }
    };

    record = () => {
      this.recorder.start();
      this.recordingTimerId = setInterval(this.handleTimerTick, TIMER_INTERVAL);

      this.setState({
        elapsedRecordingTime: 0,
        recordingStartTime: Date.now(),
      });
    };

    clear = () => {
      this.audio.clear();
      this.recorder = createMediaRecorder(this.props, this.recorderEvents);
      this.setState({ ...INITIAL_STATE() });
    };

    download = () => {
      const { waveData } = this.state;
      const filename = getDownloadFilename(this.state);

      FileSaver.saveAs(waveData, filename);
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
