export default class AudioWrapper {
  constructor () {
    if (typeof Audio === 'function') {
      this.element = new Audio();
      this.element.loop = true;
    }
  }

  setSource (waveData) {
    const objectUrl = URL.createObjectURL(waveData);

    this.element.src = objectUrl;
  }

  play () {
    this.element.currentTime = 0;

    return this.element.play();
  }

  stop () {
    return this.element.pause();
  }

  clear () {
    const { src: objectUrl } = this.element;

    this.element.pause();
    this.element.currentTime = 0;
    this.element.src = '';

    URL.revokeObjectURL(objectUrl);
  }
}
