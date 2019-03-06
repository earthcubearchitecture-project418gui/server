const { createLogger, format, transports } = require('winston');

const title = 'jsonld-ucar-isti';

let level = 'info';
if (process.argv.includes('--verbose')) { level = 'verbose'; }
if (process.argv.includes('--debug')) { level = 'debug'; }

// console.log('level', level);

const logger = createLogger({
  level,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: title + '-info.log', level: 'info' }),
    new transports.File({ filename: title + '-all.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }));
}

module.exports = logger;
