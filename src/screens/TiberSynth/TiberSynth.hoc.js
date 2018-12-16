import compose from '../../utils/compose';
import withParameterSpace from '../../hoc/withParameterSpace';
import withSynthesisEngine from '../../hoc/withSynthesisEngine';

export default compose(
  withSynthesisEngine(),
  withParameterSpace()
);
