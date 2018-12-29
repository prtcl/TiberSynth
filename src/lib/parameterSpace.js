import { expo, scale } from './math';

const FEEDBACK = 'FEEDBACK';
const FEEDBACK_DELAY = 'FEEDBACK_DELAY';
const FEEDBACK_GAIN = 'FEEDBACK_GAIN';
const FILTER = 'FILTER';
const HIPASS_FREQUENCY = 'HIPASS_FREQUENCY';
const HIPASS_Q = 'HIPASS_Q';
const LOWPASS_FREQUENCY = 'LOWPASS_FREQUENCY';
const LOWPASS_Q = 'LOWPASS_Q';
const NOISE = 'NOISE';
const NOISE_GAIN = 'NOISE_GAIN';
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
  NOISE_GAIN,
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

export const RANGES = {
  FEEDBACK,
  FILTER,
  NOISE,
};

const XMOD_DOMAINS = {
  min: [0, 100],
  max: [1000, 120000],
};

const DOMAINS = {
  [FEEDBACK]: {
    [FEEDBACK_GAIN]: {
      min: [0, 0.25],
      max: [0, 1],
    },
    [FEEDBACK_DELAY]: {
      min: [0.001, 0.01],
      max: [0.001, 1],
    },
  },
  [FILTER]: {
    [HIPASS_FREQUENCY]: {
      min: [0, 10],
      max: [40, 8000],
    },
    [LOWPASS_FREQUENCY]: {
      min: [80, 250],
      max: [2700, 18000],
    },
  },
  [NOISE]: {
    [NOISE_GAIN]: {
      min: [0, 1],
      max: [0.5, 1],
    },
    [XMOD_GAIN_A_GAIN]: { ...XMOD_DOMAINS },
    [XMOD_GAIN_B_GAIN]: { ...XMOD_DOMAINS },
    [XMOD_GAIN_C_GAIN]: { ...XMOD_DOMAINS },
    [XMOD_GAIN_D_GAIN]: { ...XMOD_DOMAINS },
    [XMOD_GAIN_E_GAIN]: { ...XMOD_DOMAINS },
    [XMOD_GAIN_F_GAIN]: { ...XMOD_DOMAINS },
  },
};

const createOscillatorFrequency = range => value => value * range;

const createOscDetune = (min = 0, max = 1) => value =>
  scale(value, 0, 1, min, max);

const createOscGain = (min = 0, max = 1) => value =>
  scale(expo(value), 0, 1, min, max);

const createRangeValue = (rangeId, pointId, mapValue) => (
  value = 0,
  ranges = {}
) => {
  const filterRange = ranges[rangeId];
  const domain = DOMAINS[rangeId][pointId];
  const min = scale(filterRange, 0, 1, ...domain.min);
  const max = scale(filterRange, 0, 1, ...domain.max);

  return scale(mapValue ? mapValue(value) : value, 0, 1, min, max);
};

export const VALUE_MAPPERS = {
  [FEEDBACK_DELAY]: createRangeValue(FEEDBACK, FEEDBACK_DELAY),
  [FEEDBACK_GAIN]: createRangeValue(FEEDBACK, FEEDBACK_GAIN, value =>
    expo(value)
  ),
  [HIPASS_FREQUENCY]: createRangeValue(FILTER, HIPASS_FREQUENCY),
  [HIPASS_Q]: value => scale(value, 0, 1, 0.2, 0.9),
  [LOWPASS_FREQUENCY]: createRangeValue(FILTER, LOWPASS_FREQUENCY),
  [LOWPASS_Q]: value => scale(value, 0, 1, 0.2, 0.5),
  [NOISE_GAIN]: createRangeValue(NOISE, NOISE_GAIN, value => expo(value)),
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
  [XMOD_GAIN_A_GAIN]: createRangeValue(NOISE, XMOD_GAIN_A_GAIN, value =>
    expo(value)
  ),
  [XMOD_GAIN_B_GAIN]: createRangeValue(NOISE, XMOD_GAIN_B_GAIN, value =>
    expo(value)
  ),
  [XMOD_GAIN_C_GAIN]: createRangeValue(NOISE, XMOD_GAIN_C_GAIN, value =>
    expo(value)
  ),
  [XMOD_GAIN_D_GAIN]: createRangeValue(NOISE, XMOD_GAIN_D_GAIN, value =>
    expo(value)
  ),
  [XMOD_GAIN_E_GAIN]: createRangeValue(NOISE, XMOD_GAIN_E_GAIN, value =>
    expo(value)
  ),
  [XMOD_GAIN_F_GAIN]: createRangeValue(NOISE, XMOD_GAIN_F_GAIN, value =>
    expo(value)
  ),
};

export const POINT_CONFIGS = [
  {
    id: POINTS.OSC_A_DETUNE,
    label: 'Osc A Detune',
    format: 'hz',
  },
  {
    id: POINTS.OSC_B_DETUNE,
    label: 'Osc B Detune',
    format: 'hz',
  },
  {
    id: POINTS.OSC_C_DETUNE,
    label: 'Osc C Detune',
    format: 'hz',
  },
  {
    id: POINTS.OSC_D_DETUNE,
    label: 'Osc D Detune',
    format: 'hz',
  },
  {
    id: POINTS.OSC_E_DETUNE,
    label: 'Osc E Detune',
    format: 'hz',
  },
  {
    id: POINTS.OSC_F_DETUNE,
    label: 'Osc F Detune',
    format: 'hz',
  },
  {
    id: XMOD_GAIN_A_GAIN,
    label: 'Osc A X-mod',
    format: 'percent',
  },
  {
    id: XMOD_GAIN_B_GAIN,
    label: 'Osc B X-mod',
    format: 'percent',
  },
  {
    id: XMOD_GAIN_C_GAIN,
    label: 'Osc C X-mod',
    format: 'percent',
  },
  {
    id: XMOD_GAIN_D_GAIN,
    label: 'Osc D X-mod',
    format: 'percent',
  },
  {
    id: XMOD_GAIN_E_GAIN,
    label: 'Osc E X-mod',
    format: 'percent',
  },
  {
    id: XMOD_GAIN_F_GAIN,
    label: 'Osc F X-mod',
    format: 'percent',
  },
  {
    id: OSC_GAIN_A_GAIN,
    label: 'Osc A/B Gain',
    format: 'percent',
  },
  {
    id: OSC_GAIN_B_GAIN,
    label: 'Osc C/D Gain',
    format: 'percent',
  },
  {
    id: OSC_GAIN_C_GAIN,
    label: 'Osc E/F Gain',
    format: 'percent',
  },
  {
    id: NOISE_GAIN,
    label: 'Noise Amount',
    format: 'percent',
  },
  {
    id: HIPASS_FREQUENCY,
    label: 'Highpass Frequency',
    format: 'hz',
  },
  {
    id: HIPASS_Q,
    label: 'Hipass Q',
    format: 'percent',
  },
  {
    id: LOWPASS_FREQUENCY,
    label: 'Lowpass Frequency',
    format: 'hz',
  },
  {
    id: LOWPASS_Q,
    label: 'Lowpass Q',
    format: 'percent',
  },
  {
    id: FEEDBACK_DELAY,
    label: 'Feedback Delay',
    format: 'ms',
  },
  {
    id: FEEDBACK_GAIN,
    label: 'Feedback Amount',
    format: 'percent',
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

export const RANGE_CONFIGS = [
  {
    id: FILTER,
    label: 'Filter Range',
    initialValue: 0.65,
  },
  {
    id: NOISE,
    label: 'Noise Balance',
    initialValue: 0.65,
  },
  {
    id: FEEDBACK,
    label: 'Feedback',
    initialValue: 0.65,
  },
];

export const getInitialRanges = () =>
  RANGE_CONFIGS.map(config => ({
    ...config,
    value: config.initialValue,
  }));

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
