import React, { Fragment } from 'react';
import Icon from '../../../components/Icon';
import Link from '../../../components/Link';
import List, { Label, Item } from '../components/List';
import Text from '../../../components/Text';
import {
  AUTHOR,
  DONATE_LINK,
  GITHUB_ISSUES_LINK,
  GITHUB_LINK,
  PRTCL_LINK,
} from '../../../lib/constants';
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

const E = <LetterSymbol>E</LetterSymbol>;
const R = <LetterSymbol>R</LetterSymbol>;
const W = <LetterSymbol>W</LetterSymbol>;
const back = <IconSymbol type="back" />;
const forward = <IconSymbol type="forward" />;
const record = <IconSymbol type="record" />;
const refresh = <IconSymbol type="refresh" />;

const Issues = () => (
  <Link to={GITHUB_ISSUES_LINK} color="black" bold={true}>
    GitHub
  </Link>
);

const Loopback = () => (
  <Link to="https://rogueamoeba.com/loopback/" color="black" bold={true}>
    Loopback
  </Link>
);

const JACK = () => (
  <Link to="http://jackaudio.org/" color="black" bold={true}>
    JACK
  </Link>
);

const Author = () => (
  <Link to={PRTCL_LINK} color="black" bold={true}>
    {AUTHOR}
  </Link>
);

const GitHub = () => (
  <Link to={GITHUB_LINK} color="black" bold={true}>
    GitHub
  </Link>
);

const Donating = () => (
  <Link to={DONATE_LINK} color="black" bold={true}>
    Donating
  </Link>
);

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
    title: 'Compatibility and Issues',
    content: (
      <Fragment>
        <Text color="black">
          TiberSynth works best in a recent version of Chrome on a desktop or
          laptop computer. Second up is Safari, with a great playing experience,
          but a few issues like the sample recorder only recording in mono. It
          does function in Safari on iOS as well, but the experience is not as
          smooth as a desktop or laptop. Firefox has a serious issue where sound
          does not play at all. I am working on it :)
        </Text>

        <Text color="black">
          If you encounter an issue or have a feature request, please submit a
          ticket on <Issues /> with as much information as you can provide. The
          more issues that are resolved, the better TiberSynth becomes for
          everyone.
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
          bit like a color-picker in an image editor program.
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
          There are two methods of creating new parameter spaces; the navigation
          controls at the top left of the screen, and their corresponding
          keyboard shortcuts. Creating a new space is possible with the{' '}
          {refresh} button or the {R} key. Moving backward or forward through
          your previous spaces is possible with the {back} {forward} buttons or
          the {W} and {E} keys.
        </Text>

        <Text color="black">
          TiberSynth saves every created space in its history, like a web
          browser, allowing you to revisit spaces that you missed, or create new
          sounds by rapidly flipping between spaces. Once you reach the end of
          your history, a new space will be created automatically.
        </Text>

        <Text color="black">
          There is currently no way to save your spaces across browser sessions.
          This may be added in a future version, but since TiberSynth is focused
          on random play and exploration, this hasn’t been a priority.
        </Text>
      </Fragment>
    ),
  },
  {
    title: 'Parameter Sliders',
    content: (
      <Fragment>
        <Text color="black">
          Rather than a linear 1:1 parameter mapping, the sliders are tone
          controls that adjust the range of a small group of parameters. These
          ranges are tuned for musical results, rather than intensive fine
          adjustments. It is important to note that your position on the playing
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
          <Item>
            A simple volume control. If you hear clipping in the output signal
            during playback or recording, adjust this setting. Conversely, some
            interesting tones can be created by raising the volume and
            overloading the output.
          </Item>
        </List>
      </Fragment>
    ),
  },
  {
    title: 'Synthesis Engine',
    content: (
      <Fragment>
        <Text color="black">
          The synthesis engine in TiberSynth is a complex FM synthesizer that
          focuses on cross-modulation and feedback to produce tones. There are 6
          oscillators whose base pitches are static, producing only a drone
          note. Their timbre is affected by their modulation relationship with
          other oscillators, and by subtle detuning as you move across the
          parameter space.
        </Text>

        <Text color="black">
          After the oscillators is a series of highpass and lowpass filters that
          shape the timbre. A feedback channel routes the filter output into a
          delay line, and then back to the filter input, creating dynamic
          frequency buildups and harmonics.
        </Text>

        <Text color="black">
          Rounding out the sound sources is a pink noise signal which is has its
          amplitude modulated by the combined oscillator output. This produces a
          shimmering or crackling sound that blends with the harmonic tones of
          the oscillators.
        </Text>

        <Text color="black">
          And finally there is a series of equalizers and compressors that
          further shape the sound. These compressors, especially in the filter
          and feedback sections, are critical to achieving dense noise tones.
        </Text>
      </Fragment>
    ),
  },
  {
    title: 'Recording',
    content: (
      <Fragment>
        <Text color="black">
          There are several methods of recording TiberSynth. The easiest way is
          to use the sample recorder on the left side of the screen. This allows
          you to record shorter sound samples by pressing the {record} button or
          the space bar, preview them, and then download them for processing in
          your sampler or DAW software. If you are just collecting drone and
          percussion samples that you will rearrange later on, this is the best
          method.
        </Text>

        <Text color="black">
          If you would like to record longer duration sounds, or full improvised
          performances, it is better to use software like <Loopback /> or{' '}
          <JACK /> to route your browser output into your DAW. This method
          avoids any issues you might have with recording in the browser.
        </Text>

        <Text color="black">
          An alternative to this is running your audio interface output back
          into the computer, maybe processing or combining with analog equipment
          as well. This last method is the by far the most labor intensive, but
          produces the best results.
        </Text>
      </Fragment>
    ),
  },
  {
    title: 'Contact',
    content: (
      <Fragment>
        <Text color="black">
          TiberSynth was created by <Author /> and the code is available on{' '}
          <GitHub />. Please feel free to contact about feature requests,
          issues, or just to chat about audio synthesis or programming.
        </Text>

        <Text color="black">
          If you really love TiberSynth or use it in your music, please consider{' '}
          <Donating /> to help with development and server costs. This ensures
          that new features will be added and this website will remain online.
        </Text>

        <Text color="black">Thanks, and happy playing.</Text>
      </Fragment>
    ),
  },
];
