## TiberSynth

The original TiberSynth was a real-time performance synthesizer built with Max/MSP, 3Dconnextion SpaceNavigator and Wacom Tablet. With the advent of the [Web Audio API](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html), and the performance improvments of JavaScript in recent WebKit browsers, it's now possible to port the synthesizer to the web browser.

## Controller Mapping and Performance

In place of the physical controllers in the original TiberSynth, there is a 2D playing surface which is mapped to a 2D random parameter space. The circles on the playing surface represent individual synthesis parameters, which scale based on your distance from them. This mapping scheme is based on work done with Jeff Carey for the Dozen Dimensions Duo project.

## Play

Enough talk; go here, turn up the speakers, and drag your mouse around: [tibersynth.prtcl.cc](http://tibersynth.prtcl.cc/). Enjoy.
