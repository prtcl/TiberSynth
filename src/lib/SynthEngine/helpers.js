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

export const createNoise = context => {
  const bufferSize = 4096;
  const node = context.createScriptProcessor(bufferSize, 1, 1);

  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  let b3 = 0;
  let b4 = 0;
  let b5 = 0;
  let b6 = 0;

  node.onaudioprocess = e => {
    const output = e.outputBuffer.getChannelData(0);

    for (var i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;

      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }
  };

  return node;
};
