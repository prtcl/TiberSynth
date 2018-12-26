import Mousetrap from 'mousetrap';

let MousetrapConstructor;

if (typeof Mousetrap === 'function') {
  MousetrapConstructor = Mousetrap;
} else {
  MousetrapConstructor = class Mousetrapped {
    bind () {}
    reset () {}
  };
}

export default MousetrapConstructor;
