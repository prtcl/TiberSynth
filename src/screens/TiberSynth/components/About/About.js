import React from 'react';
import Modal from '../../../../components/Modal';
import Text from '../../../../components/Text';

export const NAME = 'ABOUT';

const About = props => (
  <Modal {...props}>
    <Text color="white">
      TiberSynth is an experimental audio synthesizer that runs in your web
      browser. You play the synthesizer by moving your mouse around a randomized
      2D parameter space. The closer your mouse is to a given parameter, the
      more influence it has on that value.
    </Text>

    <Text color="white">
      The audio engine is a complex FM synthesizer based on cross-modulation and
      feedback. This creates excellent noise, drone, and percussion sounds.
    </Text>

    <Text color="white">
      You can create new parameter spaces, or move forward or backward through
      your spaces, using the controls below. You can also adjust ranges for
      feedback, noise, and filter values.
    </Text>
  </Modal>
);

export default About;
