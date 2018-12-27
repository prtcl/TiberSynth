import Manual from '../screens/Manual';
import TiberSynth from '../screens/TiberSynth';
import Welcome from '../screens/Welcome';

export const ROUTES = {
  WELCOME: '/',
  PLAY: '/play',
  MANUAL: '/manual',
};

export default [
  {
    exact: true,
    path: ROUTES.WELCOME,
    component: Welcome,
  },
  {
    path: ROUTES.PLAY,
    component: TiberSynth,
  },
  {
    path: ROUTES.MANUAL,
    component: Manual,
  },
];
