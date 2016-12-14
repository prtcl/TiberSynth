## TiberSynth

The original TiberSynth was a real-time performance synthesizer built with Max/MSP, 3Dconnextion SpaceNavigator and Wacom Tablet. It sounded awesome, but required a backpack full of gear and a room full of willing audience members.

Technology has changed, and we now have all kinds of craziness like the [Web Audio API](http://webaudio.github.io/web-audio-api/) that allow us to do things like, say, porting a complex gestural performance instrument to run in a web browser.

In place of the physical controllers in the original TiberSynth, there is now a 2D playing surface which is mapped to a 2D random parameter space. The circles on the playing surface represent individual synthesis parameters, which scale based on your distance from them. Each sound-space is stored in a history collection, allowing for revisiting of particularly interesting spaces. A set of specially tuned tone controls round out the instrument. 

## Contributions / Bugs

Code contributions and pull requests are welcome. This is a spare-time project, which means that details are missing, code is weird, etc. If you have feature suggestions, please post an issue on GitHub.

To run the synth locally for development, just clone this repo, run `npm install` and `bower install`, then start the dev server with `grunt develop`. 

## Play

The synth is currently running at [tibersynth.cc](http://tibersynth.cc/). You will need a modern web browser and a relatively fast computer to play the instrument. Decent speakers/headphones and a high volume level are recommended. 
