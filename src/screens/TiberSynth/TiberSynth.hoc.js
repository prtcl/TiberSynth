import compose from '../../lib/compose';
import withParameterSpace from '../../hoc/withParameterSpace';
import withSynthesisEngine from '../../hoc/withSynthesisEngine';
import withGestureWiring from './hoc/withGestureWiring';
import withUIState from './hoc/withUIState';

export default compose(
  withSynthesisEngine(),
  withParameterSpace(),
  withGestureWiring(),
  withUIState()
);
