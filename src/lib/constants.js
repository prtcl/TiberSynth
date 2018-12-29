import upperCase from 'lodash/upperCase';

const lessVariables = require('!!less-vars-loader?camelCase&resolveVariables!../less/variables.less');

const transformName = name =>
  upperCase(name)
    .split(' ')
    .join('_');

const parsePixels = px => parseInt(px.replace('px', ''));

const transformValue = value =>
  value.includes('px') ? parsePixels(value) : value;

const { ANALYSER_HEIGHT, ICON_SIZE, SPACING, SIDEBAR_WIDTH } = Object.entries(
  lessVariables
).reduce(
  (res, [key, value]) => ({
    ...res,
    [transformName(key)]: transformValue(value),
  }),
  {}
);

export { ANALYSER_HEIGHT };
export { ICON_SIZE };
export { SIDEBAR_WIDTH };
export { SPACING };
