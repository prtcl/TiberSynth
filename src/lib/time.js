import moment from 'moment';
import setupDurationFormat from 'moment-duration-format';

setupDurationFormat(moment);

export const formatDate = (time, format = 'MMMM Do YYYY, h:mm:ss a') =>
  moment(time).format(format);

export const formatDuration = (duration, format = 'HH:mm:ss') =>
  moment.duration(duration).format(format, { trim: false });
