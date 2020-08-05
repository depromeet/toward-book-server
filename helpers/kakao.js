import axios from 'axios';

import CONFIG from '../config';
import { logger } from '../config/winston';

export default (token) => {
  return axios({
    url: CONFIG.oauth.kakao.url,
    method: 'get',
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.data.response;
      }
      return false;
    })
    .catch((e) => {
      logger.error(e);
      return e;
    });
};
