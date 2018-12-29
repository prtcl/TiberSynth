import React from 'react';
import classNames from 'classnames';
import ControlBar from '../ControlBar';
import Text from '../Text';
import { RECORDER_MODES } from './hoc/withMediaRecorder';
import { formatDuration } from '../../lib/time';
import stylesheet from './Recorder.less';

const getControlActions = ({
  onClear,
  onDownload,
  onPause,
  onPlay,
  onRecord,
  recordingMode,
}) => {
  if (recordingMode === RECORDER_MODES.EMPTY) {
    return [
      {
        type: 'record',
        onClick: onRecord,
      },
      { type: 'spacer' },
    ];
  }

  if (recordingMode === RECORDER_MODES.PAUSED) {
    return [
      { type: 'close', onClick: onClear },
      { type: 'play', onClick: onPlay },
      { type: 'spacer' },
      { type: 'download', onClick: onDownload },
    ];
  }

  if (recordingMode === RECORDER_MODES.PLAYING) {
    return [
      { type: 'close', onClick: onClear },
      { type: 'pause', onClick: onPause },
      { type: 'spacer' },
      { type: 'download', onClick: onDownload },
    ];
  }

  if (recordingMode === RECORDER_MODES.RECORDING) {
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
  const { elapsedPlaybackTime, elapsedRecordingTime, recordingMode } = props;
  const actions = getControlActions(props);
  const isRecording = recordingMode === RECORDER_MODES.RECORDING;

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
        {recordingMode === RECORDER_MODES.PLAYING && (
          <Text color="white" className={stylesheet.time}>
            {formatDuration(elapsedPlaybackTime, 'mm:ss')}
          </Text>
        )}
        <Text
          color={isRecording ? 'white' : 'gray'}
          className={stylesheet.time}
        >
          {formatDuration(elapsedRecordingTime, 'mm:ss')}
        </Text>
      </div>
      <ControlBar actions={actions} />
    </div>
  );
};

export default Recorder;
