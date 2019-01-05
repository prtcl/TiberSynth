/* global Sentry */

export default {
  logError (error, info = {}) {
    if (typeof Sentry === 'undefined') {
      return;
    }

    Sentry.withScope(scope => {
      Object.keys(info).forEach(key => {
        scope.setExtra(key, info[key]);
      });

      Sentry.captureException(error);
    });
  },
};
