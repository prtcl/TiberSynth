import compose from '../../lib/compose';
import withSynthesisEngine from '../../hoc/withSynthesisEngine';
import withParameterSpace from '../../hoc/withParameterSpace';

export default compose(
  withSynthesisEngine(),
  withParameterSpace()
);
