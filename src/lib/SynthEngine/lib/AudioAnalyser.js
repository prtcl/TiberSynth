export default class AudioAnalyser {
  constructor (context, { size = 1024, max = 0, min = -100 }) {
    this.node = context.createAnalyser();
    this.node.fftSize = size;
    this.node.maxDecibels = max;
    this.node.minDecibels = min;

    const { frequencyBinCount } = this.node;

    this.waveData = new Uint8Array(frequencyBinCount);
    this.frequencyData = new Uint8Array(frequencyBinCount);
    this.sampleRate = context.sampleRate;
    this.frameRate = context.sampleRate / frequencyBinCount;
  }

  getWaveData () {
    this.node.getByteTimeDomainData(this.waveData);
    return this.waveData;
  }

  getFrequencyData () {
    this.node.getByteFrequencyData(this.frequencyData);
    return this.frequencyData;
  }
}
