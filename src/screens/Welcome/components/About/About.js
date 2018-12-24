import React from 'react';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import Text from '../../../../components/Text';
import stylesheet from './About.less';

const WIDTH = 440;

const About = () => (
  <Modal isOpen={true} width={WIDTH}>
    <div className={stylesheet.title}>
      <Text color="white" type="title">
        TiberSynth
      </Text>
    </div>

    <div className={stylesheet.content}>
      <Text color="white">
        TiberSynth is an experimental audio synthesizer that runs in your web
        browser. You play the synthesizer by moving your mouse around a
        randomized 2D parameter space. The closer your mouse is to a given
        parameter, the more influence it has on that value.
      </Text>

      <Text color="white">
        Something something about the manual and about donating money. Have fun
        playing the synth now.
      </Text>
    </div>

    <div className={stylesheet.actions}>
      <Button className={stylesheet.button} to="/play" label="Play" />
    </div>
  </Modal>
);

export default About;
