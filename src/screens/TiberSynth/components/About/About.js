import React from 'react';
import Link from '../../../../components/Link';
import Modal from '../../../../components/Modal';
import Text from '../../../../components/Text';
import { ROUTES } from '../../../../config/routes';
import {
  AUTHOR,
  DONATE_LINK,
  GITHUB_LINK,
  PRTCL_LINK,
  SPACING,
} from '../../../../lib/constants';

export const NAME = 'ABOUT';

const WIDTH = SPACING * 36;

const Author = () => (
  <Link to={PRTCL_LINK} color="white" bold={true}>
    {AUTHOR}
  </Link>
);

const GitHub = () => (
  <Link to={GITHUB_LINK} color="white" bold={true}>
    GitHub
  </Link>
);

const About = props => (
  <Modal
    {...props}
    actions={[
      { label: 'Manual', to: ROUTES.MANUAL },
      { label: 'Donate', to: DONATE_LINK },
    ]}
    width={WIDTH}
  >
    <Text color="white">
      TiberSynth is an experimental audio synthesizer that runs in your web
      browser. It is a gesture-based instrument that allows you to navigate a
      complex multi-dimensional sound-space using simple movements.
    </Text>

    <Text color="white">
      TiberSynth was created by <Author />. The code is available on <GitHub />.
    </Text>

    <Text color="white">
      If you are enjoying TiberSynth or using it for your music, please consider
      a donation to help with development and server costs.
    </Text>
  </Modal>
);

export default About;
