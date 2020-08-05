import morgan from 'morgan';

import { stream } from '../config/winston';

export default morgan('short', { stream });
