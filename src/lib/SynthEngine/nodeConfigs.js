export const NODE_TYPES = {
  COMPRESSOR: 'COMPRESSOR',
  DELAY: 'DELAY',
  DESTINATION: 'DESTINATION',
  FILTER: 'FILTER',
  GAIN: 'GAIN',
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
const FEEDBACK_GAIN = 'FEEDBACK_GAIN';
const HIPASS = 'HIPASS';
const LOWPASS = 'LOWPASS';
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
const PRE_FILTER_COMPRESSOR = 'PRE_FILTER_COMPRESSOR';
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
  FEEDBACK_GAIN,
  HIPASS,
  LOWPASS,
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
  PRE_FILTER_COMPRESSOR,
  XMOD_GAIN_A,
  XMOD_GAIN_B,
  XMOD_GAIN_C,
  XMOD_GAIN_D,
  XMOD_GAIN_E,
  XMOD_GAIN_F,
};

export default [
  {
    name: OSC_A,
    type: NODE_TYPES.OSC,
    args: { type: 'square', frequency: 0 },
    connect: [nodes => nodes[XMOD_GAIN_B], nodes => nodes[OSC_PAN_A]],
    set: (node, data) => {
      node.detune.value = data[OSC_A].detune;
      node.frequency.value = data[OSC_A].frequency;
    },
  },
  {
    name: OSC_B,
    type: NODE_TYPES.OSC,
    args: { type: 'sine', frequency: 0 },
    connect: [nodes => nodes[XMOD_GAIN_A], nodes => nodes[OSC_PAN_B]],
    set: (node, data) => {
      node.detune.value = data[OSC_B].detune;
      node.frequency.value = data[OSC_B].frequency;
    },
  },
  {
    name: OSC_C,
    type: NODE_TYPES.OSC,
    args: { type: 'sawtooth', frequency: 0 },
    connect: [nodes => nodes[XMOD_GAIN_D], nodes => nodes[OSC_PAN_C]],
    set: (node, data) => {
      node.detune.value = data[OSC_C].detune;
      node.frequency.value = data[OSC_C].frequency;
    },
  },
  {
    name: OSC_D,
    type: NODE_TYPES.OSC,
    args: { type: 'sawtooth', frequency: 0 },
    connect: [nodes => nodes[XMOD_GAIN_C], nodes => nodes[OSC_PAN_D]],
    set: (node, data) => {
      node.detune.value = data[OSC_D].detune;
      node.frequency.value = data[OSC_D].frequency;
    },
  },
  {
    name: OSC_E,
    type: NODE_TYPES.OSC,
    args: { type: 'sine', frequency: 0 },
    connect: [nodes => nodes[XMOD_GAIN_F], nodes => nodes[OSC_PAN_E]],
    set: (node, data) => {
      node.detune.value = data[OSC_E].detune;
      node.frequency.value = data[OSC_E].frequency;
    },
  },
  {
    name: OSC_F,
    type: NODE_TYPES.OSC,
    args: { type: 'square', frequency: 0 },
    connect: [nodes => nodes[XMOD_GAIN_E], nodes => nodes[OSC_PAN_F]],
    set: (node, data) => {
      node.detune.value = data[OSC_F].detune;
      node.frequency.value = data[OSC_F].frequency;
    },
  },
  {
    name: XMOD_GAIN_A,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[OSC_A].frequency],
    set: (node, data) => {
      node.gain.value = data[XMOD_GAIN_A].gain;
    },
  },
  {
    name: XMOD_GAIN_B,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[OSC_B].frequency],
    set: (node, data) => {
      node.gain.value = data[XMOD_GAIN_B].gain;
    },
  },
  {
    name: XMOD_GAIN_C,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[OSC_C].frequency],
    set: (node, data) => {
      node.gain.value = data[XMOD_GAIN_C].gain;
    },
  },
  {
    name: XMOD_GAIN_D,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[OSC_D].frequency],
    set: (node, data) => {
      node.gain.value = data[XMOD_GAIN_D].gain;
    },
  },
  {
    name: XMOD_GAIN_E,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[OSC_E].frequency],
    set: (node, data) => {
      node.gain.value = data[XMOD_GAIN_E].gain;
    },
  },
  {
    name: XMOD_GAIN_F,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[OSC_F].frequency],
    set: (node, data) => {
      node.gain.value = data[XMOD_GAIN_F].gain;
    },
  },
  {
    name: OSC_GAIN_A,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[PRE_FILTER_COMPRESSOR]],
    set: (node, data) => {
      node.gain.value = data[OSC_GAIN_A].gain;
    },
  },
  {
    name: OSC_GAIN_B,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[PRE_FILTER_COMPRESSOR]],
    set: (node, data) => {
      node.gain.value = data[OSC_GAIN_B].gain;
    },
  },
  {
    name: OSC_GAIN_C,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[PRE_FILTER_COMPRESSOR]],
    set: (node, data) => {
      node.gain.value = data[OSC_GAIN_C].gain;
    },
  },
  {
    name: OSC_PAN_A,
    type: NODE_TYPES.PAN,
    args: { x: -0.5, y: 0.1, z: 0 },
    connect: [nodes => nodes[OSC_GAIN_A]],
  },
  {
    name: OSC_PAN_B,
    type: NODE_TYPES.PAN,
    args: { x: -0.5, y: 0.1, z: 0 },
    connect: [nodes => nodes[OSC_GAIN_A]],
  },
  {
    name: OSC_PAN_C,
    type: NODE_TYPES.PAN,
    args: { x: -0.005, y: -0.1, z: 0 },
    connect: [nodes => nodes[OSC_GAIN_B]],
  },
  {
    name: OSC_PAN_D,
    type: NODE_TYPES.PAN,
    args: { x: 0.005, y: -0.1, z: 0 },
    connect: [nodes => nodes[OSC_GAIN_B]],
  },
  {
    name: OSC_PAN_E,
    type: NODE_TYPES.PAN,
    args: { x: -0.05, y: -0.5, z: 0 },
    connect: [nodes => nodes[OSC_GAIN_C]],
  },
  {
    name: OSC_PAN_F,
    type: NODE_TYPES.PAN,
    args: { x: 0.05, y: -0.5, z: 0 },
    connect: [nodes => nodes[OSC_GAIN_C]],
  },
  {
    name: PRE_FILTER_COMPRESSOR,
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
    name: HIPASS,
    type: NODE_TYPES.FILTER,
    args: {
      type: 'highpass',
      frequency: 20,
      q: 1,
    },
    connect: [nodes => nodes[LOWPASS]],
    set: (node, data) => {
      node.frequency.value = data[HIPASS].frequency;
      node.Q.value = data[HIPASS].q;
    },
  },
  {
    name: LOWPASS,
    type: NODE_TYPES.FILTER,
    args: {
      type: 'lowpass',
      frequency: 10000,
      q: 0.05,
    },
    connect: [nodes => nodes[OUTPUT], nodes => nodes[FEEDBACK]],
    set: (node, data) => {
      node.frequency.value = data[LOWPASS].frequency;
      node.Q.value = data[LOWPASS].q;
    },
  },
  {
    name: FEEDBACK,
    type: NODE_TYPES.DELAY,
    args: { time: 0 },
    connect: [nodes => nodes[FEEDBACK_GAIN]],
    set: (node, data) => {
      node.delayTime.value = data[FEEDBACK].delay;
    },
  },
  {
    name: FEEDBACK_GAIN,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[FEEDBACK_COMPRESSOR]],
    set: (node, data) => {
      node.gain.value = data[FEEDBACK_GAIN].gain;
    },
  },
  {
    name: FEEDBACK_COMPRESSOR,
    type: NODE_TYPES.COMPRESSOR,
    args: {
      ratio: 20,
      threshold: -2,
      attack: 0.001,
      release: 0.001,
    },
    connect: [nodes => nodes[HIPASS]],
  },
  {
    name: EQ_LOW,
    type: NODE_TYPES.FILTER,
    args: {
      type: 'lowshelf',
      frequency: 80,
      q: 1,
      gain: -2,
    },
    connect: [nodes => nodes[EQ_LOW_MID]],
  },
  {
    name: EQ_LOW_MID,
    type: NODE_TYPES.FILTER,
    args: {
      type: 'peaking',
      frequency: 350,
      q: 2.5,
      gain: -5,
    },
    connect: [nodes => nodes[EQ_HIGH_MID]],
  },
  {
    name: EQ_HIGH_MID,
    type: NODE_TYPES.FILTER,
    args: {
      type: 'peaking',
      frequency: 4500,
      q: 0.5,
      gain: 1,
    },
    connect: [nodes => nodes[EQ_HIGH]],
  },
  {
    name: EQ_HIGH,
    type: NODE_TYPES.FILTER,
    args: {
      type: 'highshelf',
      frequency: 8000,
      q: 1,
      gain: 15,
    },
    connect: [nodes => nodes[OUTPUT_COMPRESSOR]],
  },
  {
    name: OUTPUT_COMPRESSOR,
    type: NODE_TYPES.COMPRESSOR,
    args: {
      ratio: 20,
      threshold: -10,
      attack: 0.1,
      release: 0.25,
    },
    connect: [nodes => nodes[DESTINATION]],
  },
  {
    name: OUTPUT,
    type: NODE_TYPES.GAIN,
    args: { gain: 0 },
    connect: [nodes => nodes[EQ_LOW], nodes => nodes[DESTINATION]],
  },
  {
    name: DESTINATION,
    type: NODE_TYPES.DESTINATION,
  },
];
