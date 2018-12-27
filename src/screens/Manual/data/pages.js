import React, { Fragment } from 'react';
import Icon from '../../../components/Icon';
import List, { Label, Item } from '../components/List';
import Text from '../../../components/Text';
import stylesheet from './pages.less';

const IconSymbol = props => (
  <Icon
    {...props}
    className={stylesheet.iconSymbol}
    isClickable={false}
    color="black"
  />
);

const LetterSymbol = ({ children, ...props }) => (
  <Text {...props} className={stylesheet.letterSymbol} color="black">
    {children}
  </Text>
);

const refresh = <IconSymbol type="refresh" />;
const forward = <IconSymbol type="forward" />;
const back = <IconSymbol type="back" />;
const R = <LetterSymbol>R</LetterSymbol>;
const W = <LetterSymbol>W</LetterSymbol>;
const E = <LetterSymbol>E</LetterSymbol>;

export default [
  {
    title: 'Manual',
    content: (
      <Fragment>
        <Text color="black">
          TiberSynth is an experimental audio synthesizer that runs in your web
          browser. It is a gesture-based instrument that allows you to navigate
          a complex multi-dimensional sound-space using simple movements. It is
          designed to remove the usual barriers toward interacting with software
          instruments, letting you focus on tones, timbres, and exploration.
        </Text>

        <Text color="black">
          TiberSynth does not have the usual keyboard, knobs, or sliders
          typically found on electronic instruments. In fact, it does not have
          notes, pitches, or patches at all. It is purely a tonal and percussive
          instrument.
        </Text>

        <Text color="black">
          You play the instrument by generating random parameter spaces and
          moving through them using your mouse or touch position. Using this
          method of interaction allows for more immediacy and direct control,
          eliminating the need to stop and consider which knob to turn or which
          button to press. You simply explore until you find something that you
          like, and then hone that sound by exploring its parameters.
        </Text>

        <Text color="black">
          Playing in this manner is much closer to an acoustic instrument, where
          your hand position on a drum changes its timbre, but the drum sound
          itself cannot be modified without tuning or muting.
        </Text>
      </Fragment>
    ),
  },
  {
    title: 'Playing Surface',
    content: (
      <Fragment>
        <Text color="black">
          The playing surface is your keyboard or drum head on TiberSynth.
          Moving around the 2D surface changes your corresponding position in
          the underlying parameter space, and clicking or tapping engages the
          sound engine. The amplitude envelope is a simple AR envelope with a
          very fast attack and moderately slow release. Fast clicks produce
          plucking percussive sounds, while holding down produces noise and
          drone sounds.
        </Text>

        <Text color="black">
          The circle visualization represents the underlying synthesis
          parameters. Every parameter has an innate value and an x/y position in
          the parameter space. Moving closer to a given parameter will increase
          your influence on it, raising or lowering its value. The effect is a
          bit like a color-picker in image editors.
        </Text>

        <Text color="black">
          Try not to pay too much attention to individual parameters. Their
          visualization should serve as a visual aid to your location in the
          sound-space, rather than a driving factor.
        </Text>
      </Fragment>
    ),
  },
  {
    title: 'Navigating Spaces',
    content: (
      <Fragment>
        <Text color="black">
          There are two methods of creating new spaces; the navigation controls
          at the top left of the screen, and their corresponding keyboard
          shortcuts. Creating a new space is possible with the randomize button{' '}
          {refresh} or the {R} key. Moving forward or backward through your
          previous spaces is possible with the arrow buttons {back} {forward} or
          the {W} and {E} keys.
        </Text>

        <Text color="black">
          TiberSynth saves every created space in its history, like a web
          browser, allowing you to revisit spaces that you missed, or create new
          sounds by rapidly flipping between spaces. Once you reach the end of
          your history, a new space will be created automatically.
        </Text>
      </Fragment>
    ),
  },
  {
    title: 'Paramter Sliders',
    content: (
      <Fragment>
        <Text color="black">
          Rather than linear 1:1 parameter mappings, the sliders are tone
          controls that adjust the range of a small group of parameters. The
          ranges they control are tuned for musical results, rather than
          intensive fine adjustments. It is important to note that the playing
          surface still affects these values, even if they are constrained by
          the range slider.
        </Text>

        <List>
          <Label>Filter Range</Label>
          <Item>
            Controls the highpass and lowpass filter ranges. Low settings
            constrain their movements to the lower frequency range, while higher
            settings allow both filters to move freely.
          </Item>
          <Label>Noise Balance</Label>
          <Item>
            Adjusts the amount of cross-modulation between oscillators, and the
            modulated pink noise amplitude. Lower settings produce raw
            oscillator tones, while higher settings produce percussion and noise
            tones.
          </Item>
          <Label>Feedback</Label>
          <Item>
            Controls feedback gain and the range of delay times. Lower is lower
            and higher is higher.
          </Item>
          <Label>Volume</Label>
          <Item>A simple volume control.</Item>
        </List>
      </Fragment>
    ),
  },
  {
    title: 'Recording',
  },
  { title: 'Synthesis Engine' },
  {
    title: 'Compatibility',
    content: (
      <Fragment>
        <Text color="black">
          TiberSynth performs best in a recent version of Chrome or Safari on a
          desktop or laptop computer. It does function in Safari on iPad as
          well, but the experience is not as smooth as a desktop or laptop.
        </Text>
      </Fragment>
    ),
  },
];
