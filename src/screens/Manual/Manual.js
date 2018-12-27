import React from 'react';
import Layout, { Header, Content } from './components/Layout';
import Text from '../../components/Text';
import { ROUTES } from '../../config/routes';

const Manual = () => (
  <Layout>
    <Header
      title="Manual"
      left={{ label: 'Play', icon: 'back', to: ROUTES.PLAY }}
    />
    <Content>
      <Text color="black">
        TiberSynth is an experimental audio synthesizer that runs in your web
        browser. It is a gesture-based instrument that allows you to navigate a
        complex multi-dimensional sound-space using simple movements. It is
        designed to remove the usual barriers toward interacting with software
        instruments, letting you focus on tones, timbres, and exploration.
      </Text>

      <Text color="black">
        TiberSynth does not have the usual keyboard, knobs, or sliders typically
        found on electronic instruments. In fact, it does not have notes,
        pitches, or patches at all. It is purely a tonal and percussive
        instrument.
      </Text>

      <Text color="black">
        You play the instrument by generating random parameter spaces and moving
        through them using your mouse or touch position. Using this method of
        interaction allows for more immediacy and direct control, eliminating
        the need to stop and consider which knob to turn or which button to
        press. You simply explore until you find something that you like, and
        then hone that sound by exploring its parameters.
      </Text>

      <Text color="black">
        Playing in this manner is much closer to an acoustic instrument, where
        your hand position on a drum changes its timbre, but the drum sound
        itself cannot be modified without tuning or muting.
      </Text>
    </Content>
  </Layout>
);

export default Manual;
