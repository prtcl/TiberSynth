## TiberSynth

TiberSynth is an experimental audio synthesizer that runs in your web browser. It is a gesture-based instrument that allows you to navigate a complex multi-dimensional sound-space using simple movements. It is built with ES6, [React](https://reactjs.org/), and the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).

To play the instrument just head to [tibersynth.cc](http://tibersynth.cc/). For more information check out the [manual](http://tibersynth.cc/manual).

## Changes

Version 2 is a complete rewrite from version 1. Here's a few things that have changed:

- Improved synthesis engine and sound quality
- Completely redesigned UI
- Complete code rewrite
- SSR for fast initial render and SEO
- There is now a manual!!

## Development

```
git clone https://github.com/prtcl/tibersynth.git
cd ./tibersynth
npm i
npm run dev
```

You should now have a node server running at `localhost:3000`, as well as webpack running in watch mode.

## License

MIT
Copyright © 2012-2019 [Cory O'Brien](http://prtcl.cc/)
