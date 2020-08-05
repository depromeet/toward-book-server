import _ from 'lodash';
import dotenv from 'dotenv';

import common from './env/common';
import local from './env/local';
import development from './env/development';
import production from './env/production';

dotenv.config();

let config;

if (process.env.NODE_ENV === 'development') {
  config = development;
} else if (process.env.NODE_ENV === 'production') {
  config = production;
} else if (process.env.NODE_ENV === 'local' || !process.env.NODE_ENV) {
  config = local;
}

export default _.merge(common, config);
