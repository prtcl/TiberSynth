import { expo, scale } from './math';

const FEEDBACK_DELAY = 'FEEDBACK_DELAY';
const FEEDBACK_GAIN = 'FEEDBACK_GAIN';
const HIPASS_FREQUENCY = 'HIPASS_FREQUENCY';
const HIPASS_Q = 'HIPASS_Q';
const LOWPASS_FREQUENCY = 'LOWPASS_FREQUENCY';
const LOWPASS_Q = 'LOWPASS_Q';
const OSC_A_DETUNE = 'OSC_A_DETUNE';
const OSC_A_FREQUENCY = 'OSC_A_FREQUENCY';
const OSC_B_DETUNE = 'OSC_B_DETUNE';
const OSC_B_FREQUENCY = 'OSC_B_FREQUENCY';
const OSC_C_DETUNE = 'OSC_C_DETUNE';
const OSC_C_FREQUENCY = 'OSC_C_FREQUENCY';
const OSC_D_DETUNE = 'OSC_D_DETUNE';
const OSC_D_FREQUENCY = 'OSC_D_FREQUENCY';
const OSC_E_DETUNE = 'OSC_E_DETUNE';
const OSC_E_FREQUENCY = 'OSC_E_FREQUENCY';
const OSC_F_DETUNE = 'OSC_F_DETUNE';
const OSC_F_FREQUENCY = 'OSC_F_FREQUENCY';
const OSC_GAIN_A_GAIN = 'OSC_GAIN_A_GAIN';
const OSC_GAIN_B_GAIN = 'OSC_GAIN_B_GAIN';
const OSC_GAIN_C_GAIN = 'OSC_GAIN_C_GAIN';
const XMOD_GAIN_A_GAIN = 'XMOD_GAIN_A_GAIN';
const XMOD_GAIN_B_GAIN = 'XMOD_GAIN_B_GAIN';
const XMOD_GAIN_C_GAIN = 'XMOD_GAIN_C_GAIN';
const XMOD_GAIN_D_GAIN = 'XMOD_GAIN_D_GAIN';
const XMOD_GAIN_E_GAIN = 'XMOD_GAIN_E_GAIN';
const XMOD_GAIN_F_GAIN = 'XMOD_GAIN_F_GAIN';

export const POINTS = {
  FEEDBACK_DELAY,
  FEEDBACK_GAIN,
  HIPASS_FREQUENCY,
  HIPASS_Q,
  LOWPASS_FREQUENCY,
  LOWPASS_Q,
  OSC_A_DETUNE,
  OSC_B_DETUNE,
  OSC_C_DETUNE,
  OSC_D_DETUNE,
  OSC_E_DETUNE,
  OSC_F_DETUNE,
  OSC_GAIN_A_GAIN,
  OSC_GAIN_B_GAIN,
  OSC_GAIN_C_GAIN,
  XMOD_GAIN_A_GAIN,
  XMOD_GAIN_B_GAIN,
  XMOD_GAIN_C_GAIN,
  XMOD_GAIN_D_GAIN,
  XMOD_GAIN_E_GAIN,
  XMOD_GAIN_F_GAIN,
};

export const OSCILLATORS = {
  OSC_A_FREQUENCY,
  OSC_B_FREQUENCY,
  OSC_C_FREQUENCY,
  OSC_D_FREQUENCY,
  OSC_E_FREQUENCY,
  OSC_F_FREQUENCY,
};

const createOscillatorFrequency = range => value => value * range;

const createOscDetune = (min, max) => value => scale(value, 0, 1, min, max);

const createOscGain = (min, max) => value => scale(expo(value), 0, 1, min, max);

const createXmodGain = range => value => expo(value) * range;

export const VALUE_MAPPERS = {
  [FEEDBACK_DELAY]: value => scale(value, 0, 1, 0.001, 0.8),
  [FEEDBACK_GAIN]: value => scale(expo(value), 0, 1, 0.15, 1),
  [HIPASS_FREQUENCY]: value => scale(value, 0, 1, 5, 5000),
  [HIPASS_Q]: value => scale(value, 0, 1, 0.2, 0.9),
  [LOWPASS_FREQUENCY]: value => scale(value, 0, 1, 30, 12000),
  [LOWPASS_Q]: value => scale(value, 0, 1, 0.2, 0.5),
  [OSC_A_DETUNE]: createOscDetune(-500, 500),
  [OSC_A_FREQUENCY]: createOscillatorFrequency(150),
  [OSC_B_DETUNE]: createOscDetune(-125, 125),
  [OSC_B_FREQUENCY]: createOscillatorFrequency(1500),
  [OSC_C_DETUNE]: createOscDetune(-250, 250),
  [OSC_C_FREQUENCY]: createOscillatorFrequency(150),
  [OSC_D_DETUNE]: createOscDetune(-250, 250),
  [OSC_D_FREQUENCY]: createOscillatorFrequency(1500),
  [OSC_E_DETUNE]: createOscDetune(-250, 250),
  [OSC_E_FREQUENCY]: createOscillatorFrequency(150),
  [OSC_F_DETUNE]: createOscDetune(-500, 500),
  [OSC_F_FREQUENCY]: createOscillatorFrequency(1500),
  [OSC_GAIN_A_GAIN]: createOscGain(0.5, 1),
  [OSC_GAIN_B_GAIN]: createOscGain(0.5, 1),
  [OSC_GAIN_C_GAIN]: createOscGain(0.2, 0.8),
  [XMOD_GAIN_A_GAIN]: createXmodGain(100000),
  [XMOD_GAIN_B_GAIN]: createXmodGain(100000),
  [XMOD_GAIN_C_GAIN]: createXmodGain(100000),
  [XMOD_GAIN_D_GAIN]: createXmodGain(100000),
  [XMOD_GAIN_E_GAIN]: createXmodGain(100000),
  [XMOD_GAIN_F_GAIN]: createXmodGain(100000),
};

export const POINT_CONFIGS = [
  {
    id: POINTS.OSC_A_DETUNE,
    label: 'Osc A Detune',
  },
  {
    id: POINTS.OSC_B_DETUNE,
    label: 'Osc B Detune',
  },
  {
    id: POINTS.OSC_C_DETUNE,
    label: 'Osc C Detune',
  },
  {
    id: POINTS.OSC_D_DETUNE,
    label: 'Osc D Detune',
  },
  {
    id: POINTS.OSC_E_DETUNE,
    label: 'Osc E Detune',
  },
  {
    id: POINTS.OSC_F_DETUNE,
    label: 'Osc F Detune',
  },
  {
    id: XMOD_GAIN_A_GAIN,
    label: 'Xmod A Gain',
  },
  {
    id: XMOD_GAIN_B_GAIN,
    label: 'Xmod B Gain',
  },
  {
    id: XMOD_GAIN_C_GAIN,
    label: 'Xmod C Gain',
  },
  {
    id: XMOD_GAIN_D_GAIN,
    label: 'Xmod D Gain',
  },
  {
    id: XMOD_GAIN_E_GAIN,
    label: 'Xmod E Gain',
  },
  {
    id: XMOD_GAIN_F_GAIN,
    label: 'Xmod F Gain',
  },
  {
    id: OSC_GAIN_A_GAIN,
    label: 'Osc A Gain',
  },
  {
    id: OSC_GAIN_B_GAIN,
    label: 'Osc B Gain',
  },
  {
    id: OSC_GAIN_C_GAIN,
    label: 'Osc C Gain',
  },
  {
    id: HIPASS_FREQUENCY,
    label: 'Hipass Freq',
  },
  {
    id: HIPASS_Q,
    label: 'Hipass Q',
  },
  {
    id: LOWPASS_FREQUENCY,
    label: 'Lowpas Freq',
  },
  {
    id: LOWPASS_Q,
    label: 'Lowpass Q',
  },
  {
    id: FEEDBACK_DELAY,
    label: 'Feedback Delay',
  },
  {
    id: FEEDBACK_GAIN,
    label: 'Feedback Gain',
  },
];

export const OSCILLATOR_CONFIGS = [
  {
    id: OSC_A_FREQUENCY,
    label: 'Osc A Freq',
  },
  {
    id: OSC_B_FREQUENCY,
    label: 'Osc B Freq',
  },
  {
    id: OSC_C_FREQUENCY,
    label: 'Osc C Freq',
  },
  {
    id: OSC_D_FREQUENCY,
    label: 'Osc D Freq',
  },
  {
    id: OSC_E_FREQUENCY,
    label: 'Osc E Freq',
  },
  {
    id: OSC_F_FREQUENCY,
    label: 'Osc F Freq',
  },
];

export const getInitialPoints = () =>
  POINT_CONFIGS.map(config => ({
    ...config,
    distance: 0,
    value: 0,
    weight: 0,
    x: 0,
    y: 0,
  }));

export const getInitialOscillators = () =>
  OSCILLATOR_CONFIGS.map(config => ({
    ...config,
    value: 0,
  }));

export const getInitialPointValues = () =>
  Object.values(POINTS).reduce(
    (res, id) => ({
      ...res,
      [id]: 0,
    }),
    {}
  );

export const getInitialOscillatorValues = () =>
  Object.values(OSCILLATORS).reduce(
    (res, id) => ({
      ...res,
      [id]: 0,
    }),
    {}
  );

export const getInitialSynthesisValues = () => ({
  ...getInitialPointValues(),
  ...getInitialOscillatorValues(),
});
