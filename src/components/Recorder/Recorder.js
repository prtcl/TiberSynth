import React from 'react';
import classNames from 'classnames';
import ControlBar from '../ControlBar';
import Text from '../Text';
import { MODES } from './lib/constants';
import stylesheet from './Recorder.less';

const getControlActions = ({
  onClear,
  onDownload,
  onPause,
  onPlay,
  onRecord,
  recordingMode,
}) => {
  if (recordingMode === MODES.EMPTY) {
    return [
      {
        type: 'record',
        onClick: onRecord,
      },
      { type: 'spacer' },
    ];
  }

  if (recordingMode === MODES.PAUSED) {
    return [
      { type: 'close', onClick: onClear },
      { type: 'play', onClick: onPlay },
      { type: 'spacer' },
      { type: 'download', onClick: onDownload },
    ];
  }

  if (recordingMode === MODES.PLAYING) {
    return [
      { type: 'close', onClick: onClear },
      { type: 'pause', onClick: onPause },
      { type: 'spacer' },
      { type: 'download', onClick: onDownload },
    ];
  }

  if (recordingMode === MODES.RECORDING) {
    return [
      {
        type: 'recording',
        onClick: onPause,
      },
      { type: 'spacer' },
    ];
  }

  return [];
};

const Recorder = props => {
  const { recordingMode } = props;
  const actions = getControlActions(props);
  const isRecording = recordingMode === MODES.RECORDING;

  const classes = classNames([
    stylesheet.container,
    isRecording && stylesheet.isRecording,
  ]);

  return (
    <div className={classes}>
      <div className={stylesheet.labelContainer}>
        <Text color="white" className={stylesheet.label}>
          Recorder
        </Text>
        <Text
          color={isRecording ? 'white' : 'gray'}
          className={stylesheet.time}
        >
          00:00
        </Text>
      </div>
      <ControlBar actions={actions} />
    </div>
  );
};

export default Recorder;
