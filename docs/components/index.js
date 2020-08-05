import path from 'path';

import _ from 'lodash';
import YAML from 'yamljs';

const responsesPath = path.join(__dirname, './responses.yml');

export default _.merge(
  {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  { responses: YAML.load(responsesPath) }
);
