import compose from '../../lib/compose';
import withParameterSpace from '../../hoc/withParameterSpace';
import withSynthesisEngine from '../../hoc/withSynthesisEngine';
import withViewport from '../../hoc/withViewport';
import withGestureWiring from './hoc/withGestureWiring';
import withUIState from './hoc/withUIState';

export default compose(
  withSynthesisEngine(),
  withParameterSpace(),
  withViewport(),
  withGestureWiring(),
  withUIState()
);
