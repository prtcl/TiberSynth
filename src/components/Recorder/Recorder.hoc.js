import compose from '../../lib/compose';
import withMediaRecorder from './hoc/withMediaRecorder';
import withSynthesisEngine from '../../hoc/withSynthesisEngine';

export default compose(
  withSynthesisEngine(),
  withMediaRecorder()
);
