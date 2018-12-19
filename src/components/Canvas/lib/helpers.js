export const color = (r, g, b, a = 255) => `rgba(${r}, ${g}, ${b}, ${a})`;

export const clear = context => (width, height) => {
  context.clearRect(0, 0, width, height);
};

export const alpha = context => alpha => {
  context.globalAlpha = alpha;
};

export const fill = context => (...args) => {
  context.fillStyle = color(...args);
};

export const strokeWeight = context => width => {
  context.lineWidth = Math.max(width, 0.0001);
};

export const stroke = context => (...args) => {
  context.strokeStyle = color(...args);
};

export const rect = context => (x, y, width, height) => {
  context.fillRect(x, y, width, height);
};

export const bindHelpers = (context, helpers) =>
  Object.entries(helpers).reduce(
    (res, [name, helper]) => ({
      ...res,
      [name]: helper(context),
    }),
    {}
  );
