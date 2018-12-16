const OGG = 'audio/ogg; codecs="vorbis"';
const MPEG = 'audio/mpeg;';

const canPlay = () => {
  const a = new Audio();
  const canPlay = { ogg: false, mp3: false };

  if (!a.canPlayType) {
    return canPlay;
  }

  canPlay.ogg = a.canPlayType(OGG) === 'probably';
  canPlay.mp3
    = a.canPlayType(MPEG) === 'probably' || a.canPlayType(MPEG) === 'maybe';

  return canPlay;
};

export default canPlay;
