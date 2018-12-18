import { OSCILLATORS, POINTS } from '../parameterSpace';

export const NODE_TYPES = {
  COMPRESSOR: 'COMPRESSOR',
  DELAY: 'DELAY',
  DESTINATION: 'DESTINATION',
  FILTER: 'FILTER',
  GAIN: 'GAIN',
  NOISE: 'NOISE',
  OSC: 'OSC',
  PAN: 'PAN',
};

const DESTINATION = 'DESTINATION';
const EQ_HIGH = 'EQ_HIGH';
const EQ_HIGH_MID = 'EQ_HIGH_MID';
const EQ_LOW = 'EQ_LOW';
const EQ_LOW_MID = 'EQ_LOW_MID';
const FEEDBACK = 'FEEDBACK';
const FEEDBACK_COMPRESSOR = 'FEEDBACK_COMPRESSOR';
const FEEDBACK_COMPRESSOR_TWO = 'FEEDBACK_COMPRESSOR_TWO';
const FEEDBACK_GAIN = 'FEEDBACK_GAIN';
const HIPASS = 'HIPASS';
const LOWPASS = 'LOWPASS';
const NOISE = 'NOISE';
const NOISE_AM = 'NOISE_AM';
const NOISE_GAIN = 'NOISE_GAIN';
const OSC_A = 'OSC_A';
const OSC_B = 'OSC_B';
const OSC_C = 'OSC_C';
const OSC_D = 'OSC_D';
const OSC_E = 'OSC_E';
const OSC_F = 'OSC_F';
const OSC_GAIN_A = 'OSC_GAIN_A';
const OSC_GAIN_B = 'OSC_GAIN_B';
const OSC_GAIN_C = 'OSC_GAIN_C';
const OSC_PAN_A = 'OSC_PAN_A';
const OSC_PAN_B = 'OSC_PAN_B';
const OSC_PAN_C = 'OSC_PAN_C';
const OSC_PAN_D = 'OSC_PAN_D';
const OSC_PAN_E = 'OSC_PAN_E';
const OSC_PAN_F = 'OSC_PAN_F';
const OUTPUT = 'OUTPUT';
const OUTPUT_COMPRESSOR = 'OUTPUT_COMPRESSOR';
const OUTPUT_LIMITER = 'OUTPUT_LIMITER';
const PRE_FILTER_COMPRESSOR = 'PRE_FILTER_COMPRESSOR';
const PRE_NOISE_SUM = 'PRE_NOISE_SUM';
const XMOD_GAIN_A = 'XMOD_GAIN_A';
const XMOD_GAIN_B = 'XMOD_GAIN_B';
const XMOD_GAIN_C = 'XMOD_GAIN_C';
const XMOD_GAIN_D = 'XMOD_GAIN_D';
const XMOD_GAIN_E = 'XMOD_GAIN_E';
const XMOD_GAIN_F = 'XMOD_GAIN_F';

export const NODES = {
  DESTINATION,
  EQ_HIGH,
  EQ_HIGH_MID,
  EQ_LOW,
  EQ_LOW_MID,
  FEEDBACK,
  FEEDBACK_COMPRESSOR,
  FEEDBACK_COMPRESSOR_TWO,
  FEEDBACK_GAIN,
  HIPASS,
  LOWPASS,
  NOISE,
  NOISE_AM,
  NOISE_GAIN,
  OSC_A,
  OSC_B,
  OSC_C,
  OSC_D,
  OSC_E,
  OSC_F,
  OSC_GAIN_A,
  OSC_GAIN_B,
  OSC_GAIN_C,
  OSC_PAN_A,
  OSC_PAN_B,
  OSC_PAN_C,
  OSC_PAN_D,
  OSC_PAN_E,
  OSC_PAN_F,
  OUTPUT,
  OUTPUT_COMPRESSOR,
  OUTPUT_LIMITER,
  PRE_FILTER_COMPRESSOR,
  PRE_NOISE_SUM,
  XMOD_GAIN_A,
  XMOD_GAIN_B,
  XMOD_GAIN_C,
  XMOD_GAIN_D,
  XMOD_GAIN_E,
  XMOD_GAIN_F,
};

const getCurrentTime = node => node.context.currentTime;

export default [
  {
    id: OSC_A,
    type: NODE_TYPES.OSC,
    args: { type: 'square', frequency: 0 },
    connect: [nodes => nodes[XMOD_GAIN_B], nodes => nodes[OSC_PAN_A]],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);

      node.detune.setValueAtTime(data[POINTS.OSC_A_DETUNE], currentTime);
      node.frequency.setValueAtTime(
        data[OSCILLATORS.OSC_A_FREQUENCY],
        currentTime
      );
    },
  },
  {
    id: OSC_B,
    type: NODE_TYPES.OSC,
    args: { type: 'sine', frequency: 0 },
    connect: [nodes => nodes[XMOD_GAIN_A], nodes => nodes[OSC_PAN_B]],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);

      node.detune.setValueAtTime(data[POINTS.OSC_B_DETUNE], currentTime);
      node.frequency.setValueAtTime(
        data[OSCILLATORS.OSC_B_FREQUENCY],
        currentTime
      );
    },
  },
  {
    id: OSC_C,
    type: NODE_TYPES.OSC,
    args: { type: 'sawtooth', frequency: 0 },
    connect: [nodes => nodes[XMOD_GAIN_D], nodes => nodes[OSC_PAN_C]],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);

      node.detune.setValueAtTime(data[POINTS.OSC_C_DETUNE], currentTime);
      node.frequency.setValueAtTime(
        data[OSCILLATORS.OSC_C_FREQUENCY],
        currentTime
      );
    },
  },
  {
    id: OSC_D,
    type: NODE_TYPES.OSC,
    args: { type: 'sawtooth', frequency: 0 },
    connect: [nodes => nodes[XMOD_GAIN_C], nodes => nodes[OSC_PAN_D]],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);

      node.detune.setValueAtTime(data[POINTS.OSC_D_DETUNE], currentTime);
      node.frequency.setValueAtTime(
        data[OSCILLATORS.OSC_D_FREQUENCY],
        currentTime
      );
    },
  },
  {
    id: OSC_E,
    type: NODE_TYPES.OSC,
    args: { type: 'sine', frequency: 0 },
    connect: [nodes => nodes[XMOD_GAIN_F], nodes => nodes[OSC_PAN_E]],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);

      node.detune.setValueAtTime(data[POINTS.OSC_E_DETUNE], currentTime);
      node.frequency.setValueAtTime(
        data[OSCILLATORS.OSC_E_FREQUENCY],
        currentTime
      );
    },
  },
  {
    id: OSC_F,
    type: NODE_TYPES.OSC,
    args: { type: 'square', frequency: 0 },
    connect: [nodes => nodes[XMOD_GAIN_E], nodes => nodes[OSC_PAN_F]],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);

      node.detune.setValueAtTime(data[POINTS.OSC_F_DETUNE], currentTime);
      node.frequency.setValueAtTime(
        data[OSCILLATORS.OSC_F_FREQUENCY],
        currentTime
      );
    },
  },
  {
    id: XMOD_GAIN_A,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[OSC_A].frequency],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);
      const value = data[POINTS.XMOD_GAIN_A_GAIN];

      node.gain.setTargetAtTime(value, currentTime, 0.01);
    },
  },
  {
    id: XMOD_GAIN_B,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[OSC_B].frequency],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);
      const value = data[POINTS.XMOD_GAIN_B_GAIN];

      node.gain.setTargetAtTime(value, currentTime, 0.01);
    },
  },
  {
    id: XMOD_GAIN_C,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[OSC_C].frequency],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);
      const value = data[POINTS.XMOD_GAIN_C_GAIN];

      node.gain.setTargetAtTime(value, currentTime, 0.01);
    },
  },
  {
    id: XMOD_GAIN_D,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[OSC_D].frequency],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);
      const value = data[POINTS.XMOD_GAIN_D_GAIN];

      node.gain.setTargetAtTime(value, currentTime, 0.01);
    },
  },
  {
    id: XMOD_GAIN_E,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[OSC_E].frequency],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);
      const value = data[POINTS.XMOD_GAIN_E_GAIN];

      node.gain.setTargetAtTime(value, currentTime, 0.01);
    },
  },
  {
    id: XMOD_GAIN_F,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[OSC_F].frequency],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);
      const value = data[POINTS.XMOD_GAIN_F_GAIN];

      node.gain.setTargetAtTime(value, currentTime, 0.01);
    },
  },
  {
    id: OSC_PAN_A,
    type: NODE_TYPES.PAN,
    args: { x: -0.5, y: 0.1, z: 0 },
    connect: [nodes => nodes[OSC_GAIN_A]],
  },
  {
    id: OSC_PAN_B,
    type: NODE_TYPES.PAN,
    args: { x: 0.5, y: 0.1, z: 0 },
    connect: [nodes => nodes[OSC_GAIN_A]],
  },
  {
    id: OSC_PAN_C,
    type: NODE_TYPES.PAN,
    args: { x: -0.005, y: -0.1, z: 0 },
    connect: [nodes => nodes[OSC_GAIN_B]],
  },
  {
    id: OSC_PAN_D,
    type: NODE_TYPES.PAN,
    args: { x: 0.005, y: -0.1, z: 0 },
    connect: [nodes => nodes[OSC_GAIN_B]],
  },
  {
    id: OSC_PAN_E,
    type: NODE_TYPES.PAN,
    args: { x: -0.05, y: -0.5, z: 0 },
    connect: [nodes => nodes[OSC_GAIN_C]],
  },
  {
    id: OSC_PAN_F,
    type: NODE_TYPES.PAN,
    args: { x: 0.05, y: -0.5, z: 0 },
    connect: [nodes => nodes[OSC_GAIN_C]],
  },
  {
    id: OSC_GAIN_A,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [
      nodes => nodes[PRE_FILTER_COMPRESSOR],
      nodes => nodes[PRE_NOISE_SUM],
    ],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);
      const value = data[POINTS.OSC_GAIN_A_GAIN];

      node.gain.setTargetAtTime(value, currentTime, 0.01);
    },
  },
  {
    id: OSC_GAIN_B,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [
      nodes => nodes[PRE_FILTER_COMPRESSOR],
      nodes => nodes[PRE_NOISE_SUM],
    ],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);
      const value = data[POINTS.OSC_GAIN_B_GAIN];

      node.gain.setTargetAtTime(value, currentTime, 0.01);
    },
  },
  {
    id: OSC_GAIN_C,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [
      nodes => nodes[PRE_FILTER_COMPRESSOR],
      nodes => nodes[PRE_NOISE_SUM],
    ],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);
      const value = data[POINTS.OSC_GAIN_C_GAIN];

      node.gain.setTargetAtTime(value, currentTime, 0.01);
    },
  },
  {
    id: PRE_NOISE_SUM,
    type: NODE_TYPES.GAIN,
    args: { gain: 1 },
    connect: [nodes => nodes[NOISE_AM].gain],
  },
  {
    id: NOISE,
    type: NODE_TYPES.NOISE,
    connect: [nodes => nodes[NOISE_AM]],
  },
  {
    id: NOISE_AM,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[NOISE_GAIN]],
  },
  {
    id: NOISE_GAIN,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[PRE_FILTER_COMPRESSOR]],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);
      const value = data[POINTS.NOISE_GAIN];

      node.gain.setTargetAtTime(value, currentTime, 0.01);
    },
  },
  {
    id: PRE_FILTER_COMPRESSOR,
    type: NODE_TYPES.COMPRESSOR,
    args: {
      ratio: 1.5,
      threshold: -2,
      attack: 0.1,
      release: 0.25,
    },
    connect: [nodes => nodes[HIPASS]],
  },
  {
    id: HIPASS,
    type: NODE_TYPES.FILTER,
    args: {
      type: 'highpass',
      frequency: 20,
      q: 1,
    },
    connect: [nodes => nodes[LOWPASS]],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);

      node.frequency.setValueAtTime(data[POINTS.HIPASS_FREQUENCY], currentTime);
      node.Q.setValueAtTime(data[POINTS.HIPASS_Q], currentTime);
    },
  },
  {
    id: LOWPASS,
    type: NODE_TYPES.FILTER,
    args: {
      type: 'lowpass',
      frequency: 10000,
      q: 0.05,
    },
    connect: [nodes => nodes[EQ_LOW]],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);

      node.frequency.setValueAtTime(
        data[POINTS.LOWPASS_FREQUENCY],
        currentTime
      );
      node.Q.setValueAtTime(data[POINTS.LOWPASS_Q], currentTime);
    },
  },
  {
    id: FEEDBACK,
    type: NODE_TYPES.DELAY,
    args: { time: 0 },
    connect: [nodes => nodes[FEEDBACK_GAIN]],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);
      const value = data[POINTS.FEEDBACK_DELAY];

      node.delayTime.setTargetAtTime(value, currentTime, 0.01);
    },
  },
  {
    id: FEEDBACK_GAIN,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[FEEDBACK_COMPRESSOR]],
    set: (node, data) => {
      const currentTime = getCurrentTime(node);
      const value = data[POINTS.FEEDBACK_GAIN];

      node.gain.setTargetAtTime(value, currentTime, 0.01);
    },
  },
  {
    id: FEEDBACK_COMPRESSOR,
    type: NODE_TYPES.COMPRESSOR,
    args: {
      attack: 0.2,
      ratio: 5,
      release: 0.2,
      threshold: -5,
    },
    connect: [nodes => nodes[FEEDBACK_COMPRESSOR_TWO]],
  },
  {
    id: FEEDBACK_COMPRESSOR_TWO,
    type: NODE_TYPES.COMPRESSOR,
    args: {
      attack: 0.05,
      ratio: 20,
      release: 0.1,
      threshold: -18,
    },
    connect: [nodes => nodes[HIPASS]],
  },
  {
    id: EQ_LOW,
    type: NODE_TYPES.FILTER,
    args: {
      type: 'lowshelf',
      frequency: 100,
      q: 1,
      gain: 8,
    },
    connect: [nodes => nodes[EQ_LOW_MID]],
  },
  {
    id: EQ_LOW_MID,
    type: NODE_TYPES.FILTER,
    args: {
      type: 'peaking',
      frequency: 350,
      q: 0.5,
      gain: 12,
    },
    connect: [nodes => nodes[EQ_HIGH_MID]],
  },
  {
    id: EQ_HIGH_MID,
    type: NODE_TYPES.FILTER,
    args: {
      type: 'peaking',
      frequency: 2400,
      q: 1.5,
      gain: 6,
    },
    connect: [nodes => nodes[EQ_HIGH]],
  },
  {
    id: EQ_HIGH,
    type: NODE_TYPES.FILTER,
    args: {
      type: 'highshelf',
      frequency: 6000,
      q: 0.75,
      gain: 16,
    },
    connect: [nodes => nodes[OUTPUT], nodes => nodes[FEEDBACK]],
  },
  {
    id: OUTPUT,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[OUTPUT_COMPRESSOR]],
  },
  {
    id: OUTPUT_COMPRESSOR,
    type: NODE_TYPES.COMPRESSOR,
    args: {
      ratio: 5,
      threshold: -11,
      attack: 0.1,
      release: 0.1,
    },
    connect: [nodes => nodes[OUTPUT_LIMITER]],
  },
  {
    id: OUTPUT_LIMITER,
    type: NODE_TYPES.COMPRESSOR,
    args: {
      ratio: 11,
      threshold: -6,
      attack: 0.1,
      release: 0.1,
    },
    connect: [nodes => nodes[DESTINATION]],
  },
  {
    id: DESTINATION,
    type: NODE_TYPES.DESTINATION,
  },
];
