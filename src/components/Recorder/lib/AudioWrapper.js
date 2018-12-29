export default class AudioWrapper {
  constructor () {
    if (typeof Audio === 'function') {
      this.element = new Audio();
      this.element.loop = true;
    }
  }

  getCurrentTime () {
    const { currentTime } = this.element;

    return Math.round(currentTime * 1000) || 0;
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

  addEventListener (name, handler) {
    if (!this.element) {
      return;
    }

    this.element.addEventListener(name, handler);
  }

  removeEventListener (name, handler) {
    if (!this.element) {
      return;
    }

    this.element.removeEventListener(name, handler);
  }
}
