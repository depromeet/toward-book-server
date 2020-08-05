import cors from 'cors';

import CONFIG from '../config';

const options = {
  origin: (origin, callback) => {
    if (CONFIG.server.allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
};

export default cors(options);
