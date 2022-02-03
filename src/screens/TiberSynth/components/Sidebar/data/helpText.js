import React, { Fragment } from 'react';
import Text from '../../../../../components/Text';

export default {
  FEEDBACK: (
    <Fragment>
      <Text color="white">
        The Feedback setting controls the delay&apos;s feedback gain and the
        range of delay times. Turn this down to hear the dry oscillator tones,
        or higher for more droning and percussive sounds.
      </Text>
    </Fragment>
  ),
  FILTER: (
    <Fragment>
      <Text color="white">
        Filter Range allows you to limit the highpass and lowpass filter ranges,
        a bit like a tone control on a more traditional synthesizer. Low
        settings constrain their movements to the lower frequency range, while
        higher settings allow both filters to move freely, for more dramatic
        changes.
      </Text>
    </Fragment>
  ),
  NOISE: (
    <Fragment>
      <Text color="white">
        Noise Balance adjusts the amount of noise and the amount of modulation
        between oscillators. Lower settings produce more raw and harmonic drone
        sounds, while higher settings produce more extreme percussion sounds and
        noise textures.
      </Text>
    </Fragment>
  ),
  SPACE_CONTROLS: (
    <Fragment>
      <Text color="white">
        The key to playing TiberSynth is navigating it&apos;s randomly created
        sound spaces.
      </Text>
      <Text color="white">
        TiberSynth saves every new space in its history, allowing you to revisit
        spaces that you missed, or create new sounds by flipping rapidly between
        spaces. Once you reach the end of your history, a new space will be
        created automatically.
      </Text>
      <Text color="white">
        You can navigate through sound spaces by using the sidebar controls, or
        by pressing the W (back), E (forward), or R (randomize) keys.
      </Text>
    </Fragment>
  ),
};
