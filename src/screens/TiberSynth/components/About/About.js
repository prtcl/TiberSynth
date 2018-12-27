import React from 'react';
import Modal from '../../../../components/Modal';
import Text from '../../../../components/Text';
import Link from '../../../../components/Link';

export const NAME = 'ABOUT';

const WIDTH = 13 * 34;

const Author = () => (
  <Link to="http://prtcl.cc" color="white" bold={true}>
    Cory O&apos;Brien
  </Link>
);

const GitHub = () => (
  <Link to="https://github.com/prtcl/tibersynth" color="white" bold={true}>
    GitHub
  </Link>
);

const About = props => (
  <Modal
    {...props}
    actions={[
      { label: 'Manual', to: '/manual' },
      { label: 'Donate', onClick: () => console.log('donate') },
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
