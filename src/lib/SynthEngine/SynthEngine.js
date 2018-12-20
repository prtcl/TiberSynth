import AudioContext from './lib/AudioContext';
import nodeConfigs, { NODES, NODE_TYPES } from './nodeConfigs';
import {
  createAnalyzer,
  createCompressor,
  createDelay,
  createFilter,
  createGain,
  createNoise,
  createOscillator,
  createPanner,
} from './lib/helpers';
import { expo } from '../math';

export const HELPERS = {
  [NODE_TYPES.ANALYZER]: createAnalyzer,
  [NODE_TYPES.COMPRESSOR]: createCompressor,
  [NODE_TYPES.DELAY]: createDelay,
  [NODE_TYPES.DESTINATION]: context => context.destination,
  [NODE_TYPES.FILTER]: createFilter,
  [NODE_TYPES.GAIN]: createGain,
  [NODE_TYPES.NOISE]: createNoise,
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
      const { type, id, args = {} } = config;
      const factory = HELPERS[type];

      this.nodes[id] = factory(this.context, args);
    });
  }

  connectNodes () {
    nodeConfigs.forEach(config => {
      const { connect, id } = config;

      if (!connect) {
        return;
      }

      const node = this.nodes[id];

      connect.forEach(connector => {
        node.connect(connector(this.nodes));
      });
    });
  }

  play () {
    const currentTime = this.context.currentTime;
    const output = this.nodes[NODES.OUTPUT];

    output.gain.setTargetAtTime(1, currentTime, 0.025);

    return currentTime;
  }

  stop () {
    const currentTime = this.context.currentTime;
    const output = this.nodes[NODES.OUTPUT];

    output.gain.setTargetAtTime(0, currentTime, 0.1);

    return currentTime;
  }

  updateValues (data) {
    nodeConfigs.forEach(config => {
      const { id, set } = config;

      if (typeof set !== 'function') {
        return;
      }

      const node = this.nodes[id];

      set(node, data);
    });
  }

  getAnalyzer () {
    return this.nodes[NODES.ANALYZER];
  }

  isSuspended () {
    return this.context.state === 'suspended';
  }

  resume () {
    this.context.resume();
  }

  setVolume (value) {
    const currentTime = this.context.currentTime;
    const node = this.nodes[NODES.MAIN];

    node.gain.setTargetAtTime(expo(value), currentTime, 0.1);

    return currentTime;
  }
}
