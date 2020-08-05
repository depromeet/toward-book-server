import os from 'os';

import moment from 'moment';
import winston from 'winston';
import 'winston-daily-rotate-file';

import CONFIG from '.';

const options = {};
const LOGGING = CONFIG.server.logging;
const { combine, timestamp, label, printf, errors, colorize } = winston.format;
const defaultFormat = combine(errors({ stack: true }), colorize({ all: true }));

const timeStampFormat = () => {
  return moment().utc().format('YYYY-MM-DD HH:mm:ss.SSS Z');
};

const customFormat = printf(({ level, message, stack, label, timestamp }) => {
  return `[${level}] ${timestamp} | ${message} | ${stack ? `${stack}|` : ''}${label}`;
});

const debugTransportConsole = new winston.transports.Console({
  name: 'debug-console',
  level: 'debug',
  showLevel: true,
  format: combine(label({ label: 'debug' }), timestamp({ format: timeStampFormat }), customFormat),
});

const infoTransportFile = new winston.transports.DailyRotateFile({
  name: 'info-file',
  filename: `${LOGGING.logDir}/info/info-%DATE%-${os.hostname()}.log`,
  datePattern: 'YYYYMMDD',
  maxSize: 50000000,
  maxFiles: 20,
  level: 'info',
  showLevel: true,
  format: combine(label({ label: 'info' }), timestamp({ format: timeStampFormat }), customFormat),
});

const errorTransportFile = new winston.transports.DailyRotateFile({
  name: 'error-file',
  filename: `${LOGGING.logDir}/error/error-%DATE%-${os.hostname()}.log`,
  datePattern: 'YYYYMMDD',
  maxSize: 50000000,
  maxFiles: 20,
  level: 'error',
  showLevel: true,
  format: combine(label({ label: 'error' }), timestamp({ format: timeStampFormat }), customFormat),
});

if (LOGGING.debug) {
  options.format = defaultFormat;
  options.transports = [debugTransportConsole];
} else {
  options.format = defaultFormat;
  options.transports = [infoTransportFile, errorTransportFile];
}

const logger = winston.createLogger(options);

const stream = {
  write: (message) => {
    logger.info(message);
  },
};

export { logger, stream };
