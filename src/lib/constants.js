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

export const MOBILE_BREAKPOINT = 600;

export const AUTHOR = 'Cory O\'Brien';
export const DONATE_LINK
  = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=4KML9FARYJCGW&item_name=TiberSynth&currency_code=USD&source=url';
export const GITHUB_ISSUES_LINK = 'https://github.com/prtcl/tibersynth/issues';
export const GITHUB_LINK = 'https://github.com/prtcl/tibersynth';
export const PRTCL_LINK = 'http://prtcl.cc';
