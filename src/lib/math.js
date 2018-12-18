const DISTANCE_SCALE = 2.01;

export const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

export const flip = n => n * -1 + 1;

export const rand = (min = 0, max = 1) => Math.random() * (max - min) + min;

export const scale = (n, a1, a2, b1, b2) =>
  b1 + ((clamp(n, a1, a2) - a1) * (b2 - b1)) / (a2 - a1);

export const calculateDistance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  const x = x1 - x2;
  const y = y1 - y2;
  const d = Math.sqrt(x * x + y * y) / DISTANCE_SCALE;

  return clamp(d, 0, 1);
};

export const expo = n => clamp(Math.pow(n, Math.E), 0, 1);
