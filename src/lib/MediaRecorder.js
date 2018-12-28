const WAV = 'audio/wav';
let MediaRecorderConstructor;

if (typeof window === 'undefined') {
  MediaRecorderConstructor = class MediaRecorder {
    start () {
      return null;
    }
    stop () {
      return null;
    }
    addEventListener () {
      return null;
    }
    removeEventListener () {
      return null;
    }
  };
} else if (
  !window.MediaRecorder
  || !window.MediaRecorder.isTypeSupported(WAV)
) {
  MediaRecorderConstructor = require('opus-media-recorder');
}

export default MediaRecorderConstructor;
