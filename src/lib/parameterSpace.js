import { scale } from './math';

const FEEDBACK_DELAY = 'FEEDBACK_DELAY';
const FEEDBACK_GAIN = 'FEEDBACK_GAIN';
const HIPASS_FREQUENCY = 'HIPASS_FREQUENCY';
const HIPASS_Q = 'HIPASS_Q';
const LOWPASS_FREQUENCY = 'LOWPASS_FREQUENCY';
const LOWPASS_Q = 'LOWPASS_Q';
const OSC_A_DETUNE = 'OSC_A_DETUNE';
const OSC_B_DETUNE = 'OSC_B_DETUNE';
const OSC_C_DETUNE = 'OSC_C_DETUNE';
const OSC_D_DETUNE = 'OSC_D_DETUNE';
const OSC_E_DETUNE = 'OSC_E_DETUNE';
const OSC_F_DETUNE = 'OSC_F_DETUNE';
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

const createOscDetune = (min, max) => value => scale(value, 0, 1, min, max);

const createOscGain = (min, max) => value => scale(value, 0, 1, min, max);

const createXmodGain = (range = 60000) => value => value * range;

export const VALUE_MAPPERS = {
  [FEEDBACK_DELAY]: value => scale(value, 0, 1, 0.001, 0.25),
  [FEEDBACK_GAIN]: value => scale(value, 0, 1, 0.5, 1),
  [HIPASS_FREQUENCY]: value => scale(value, 0, 1, 0, 8000),
  [HIPASS_Q]: value => scale(value, 0, 1, 0.7, 1.2),
  [LOWPASS_FREQUENCY]: value => scale(value, 0, 1, 30, 18000),
  [LOWPASS_Q]: value => scale(value, 0, 1, 0.7, 1.2),
  [OSC_A_DETUNE]: createOscDetune(-500, 500),
  [OSC_B_DETUNE]: createOscDetune(-125, 125),
  [OSC_C_DETUNE]: createOscDetune(-250, 250),
  [OSC_D_DETUNE]: createOscDetune(-250, 250),
  [OSC_E_DETUNE]: createOscDetune(-250, 250),
  [OSC_F_DETUNE]: createOscDetune(-500, 500),
  [OSC_GAIN_A_GAIN]: createOscGain(0.5, 0.9),
  [OSC_GAIN_B_GAIN]: createOscGain(0.4, 0.7),
  [OSC_GAIN_C_GAIN]: createOscGain(0.2, 0.9),
  [XMOD_GAIN_A_GAIN]: createXmodGain(60000),
  [XMOD_GAIN_B_GAIN]: createXmodGain(60000),
  [XMOD_GAIN_C_GAIN]: createXmodGain(60000),
  [XMOD_GAIN_D_GAIN]: createXmodGain(60000),
  [XMOD_GAIN_E_GAIN]: createXmodGain(60000),
  [XMOD_GAIN_F_GAIN]: createXmodGain(60000),
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

export const getInitialPoints = () =>
  POINT_CONFIGS.map(config => ({
    ...config,
    distance: 0,
    value: 0,
    weight: 0,
    x: 0,
    y: 0,
  }));

export const getInitialSynthesisValues = () =>
  Object.values(POINTS).reduce(
    (res, id) => ({
      ...res,
      [id]: 0,
    }),
    {}
  );
