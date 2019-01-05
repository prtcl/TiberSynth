import React, { Component } from 'react';
import Link from '../Link';
import Text from '../Text';
import sentry from '../../lib/sentry';
import { GITHUB_ISSUES_LINK } from '../../lib/constants';
import stylesheet from './ErrorBoundary.less';

const ErrorDisplay = () => (
  <section className={stylesheet.container}>
    <div className={stylesheet.content}>
      <Text type="title" color="black">
        Something went wrong!
      </Text>
      <Text color="black">
        You can file an issue on{' '}
        <Link color="black" to={GITHUB_ISSUES_LINK}>
          GitHub
        </Link>
        <br />
        or{' '}
        <Link color="black" onClick={() => location.reload()}>
          reload the page
        </Link>{' '}
        to keep playing.
      </Text>
    </div>
  </section>
);

export default class ErrorBoundary extends Component {
  state = {
    error: null,
    hasError: false,
  };

  static getDerivedStateFromError (error) {
    return { error, hasError: true };
  }

  componentDidCatch (error, info) {
    sentry.logError(error, info);
    console.error(error);
  }

  render () {
    const { children } = this.props;
    const { error, hasError } = this.state;

    if (hasError) {
      return <ErrorDisplay error={error} />;
    }

    return children;
  }
}
