import AudioContext from './utils/AudioContext';
import nodeConfigs, { NODES, NODE_TYPES } from './nodeConfigs';

export const createGain = (context, { gain }) => {
  const node = context.createGain();

  node.gain.value = gain;

  return node;
};

export const createOscillator = (
  context,
  { type = 'sine', frequency = 440 }
) => {
  const node = context.createOscillator();

  node.type = type;
  node.frequency.value = frequency;
  node.start(0);

  return node;
};

export const createPanner = (context, { x = 0, y = 0, z = 0 }) => {
  const node = context.createPanner();

  node.panningModel = 'equalpower';
  node.distanceModel = 'exponential';
  node.setPosition(x, y, z);

  return node;
};

export const createCompressor = (
  context,
  { threshold = -1, ratio = 1.5, attack = 0.1, release = 0.25 }
) => {
  const node = context.createDynamicsCompressor();

  node.threshold.value = threshold;
  node.ratio.value = ratio;
  node.attack.value = attack;
  node.release.value = release;

  return node;
};

export const createFilter = (
  context,
  { type = 'lowpass', frequency = 1000, q = 0.0001, gain = 0 }
) => {
  const node = context.createBiquadFilter();

  node.type = type;
  node.frequency.value = frequency;
  node.Q.value = q;
  node.gain.value = gain;

  return node;
};

export const createDelay = (context, { time = 0 }) => {
  const node = context.createDelay();

  node.delayTime.value = time;

  return node;
};

export const HELPERS = {
  [NODE_TYPES.COMPRESSOR]: createCompressor,
  [NODE_TYPES.DELAY]: createDelay,
  [NODE_TYPES.DESTINATION]: context => context.destination,
  [NODE_TYPES.FILTER]: createFilter,
  [NODE_TYPES.GAIN]: createGain,
  [NODE_TYPES.OSC]: createOscillator,
  [NODE_TYPES.PAN]: createPanner,
};

export default class SynthEngine {
  constructor () {
    this.context = new AudioContext();
    this.nodes = {};

    this.initNodes();
    this.connectNodes();
  }

  initNodes () {
    nodeConfigs.forEach(config => {
      const { type, name, args = {} } = config;
      const factory = HELPERS[type];

      this.nodes[name] = factory(this.context, args);
    });
  }

  connectNodes () {
    nodeConfigs.forEach(config => {
      const { connect, name } = config;

      if (!connect) {
        return;
      }

      const node = this.nodes[name];

      connect.forEach(connector => {
        node.connect(connector(this.nodes));
      });
    });
  }

  play () {
    const currentTime = this.context.currentTime;
    const output = this.nodes[NODES.OUTPUT];

    output.gain.setTargetAtTime(0.9, currentTime, 0.025);

    return currentTime;
  }

  stop () {
    const currentTime = this.context.currentTime;
    const output = this.nodes[NODES.OUTPUT];

    output.gain.setTargetAtTime(0, currentTime, 0.1);

    return currentTime;
  }
}
