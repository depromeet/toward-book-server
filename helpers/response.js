import moment from 'moment';

import CONFIG from '../config';
import locale from '../locale';

export const successRes = (req, res, data, code = 200) => {
  const contents = {
    code: `${code}00`,
    timestamp: moment.utc().format('YYYY-MM-DD HH:mm:ss.Z'),
    message: null,
    data,
  };
  res.json(contents);
};

export const errorRes = (req, res, code = 500) => {
  const { codes } = locale[CONFIG.server.language];
  res.json({
    code: code === 500 ? 50000 : code,
    timestamp: moment.utc().format('YYYY-MM-DD HH:mm:ss.Z'),
    message: codes[code],
    data: null,
  });
};
