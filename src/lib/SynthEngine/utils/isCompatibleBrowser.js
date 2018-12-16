import AudioContext from './AudioContext';
import canPlay from './canPlay';

const isCompatibleBrowser = () => {
  if (typeof AudioContext !== 'function') {
    return false;
  }

  const context = new AudioContext();

  if (typeof context === 'undefined') {
    return false;
  }
  if (canPlay.ogg === false && canPlay.mp3 === false) {
    return false;
  }
  if (!('createGain' in context)) {
    return false;
  }

  return true;
};

export default isCompatibleBrowser;
