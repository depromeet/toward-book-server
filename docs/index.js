import path from 'path';

import _ from 'lodash';
import YAML from 'yamljs';
import recursive from 'recursive-readdir-synchronous';

import components from './components';

let specs = {};
const specsPath = path.join(__dirname, './specs');
const specPaths = recursive(specsPath);

specPaths.forEach((item) => {
  specs = _.merge(specs, { paths: YAML.load(item) });
});

export default _.merge(
  {
    openapi: '3.0.0',
    info: {
      title: '북쪽으로 API',
      version: '1.0.0',
    },
    components,
  },
  specs
);
