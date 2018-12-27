import React from 'react';
import Modal from '../../../../components/Modal';
import Text from '../../../../components/Text';
import { ROUTES } from '../../../../config/routes';

const About = () => (
  <Modal
    isOpen={true}
    title="TiberSynth"
    actions={[
      { label: 'Manual', to: ROUTES.MANUAL },
      { label: 'Play', to: ROUTES.PLAY },
    ]}
  >
    <Text color="white">
      TiberSynth is an experimental audio synthesizer that runs in your web
      browser. It is a gesture-based instrument that allows you to navigate a
      complex multi-dimensional sound-space using simple movements.
    </Text>

    <Text color="white">
      Check out the manual pages if you’d like a better introduction, or just
      click play to dive in.
    </Text>
  </Modal>
);

export default About;
