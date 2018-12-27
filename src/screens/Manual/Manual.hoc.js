import compose from '../../lib/compose';
import withPageContent from './hoc/withPageContent';
import pages from './data/pages';

export default compose(withPageContent({ pages }));
