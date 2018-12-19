let ContextConstructor;

if (typeof AudioContext !== 'undefined') {
  ContextConstructor = window.AudioContext;
} else if (typeof webkitAudioContext !== 'undefined') {
  ContextConstructor = window.webkitAudioContext;
}

export default ContextConstructor;
