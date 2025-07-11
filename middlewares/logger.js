const morgan = require('morgan');
const getCallerInfo = require('../utils/getCallerInfo');

const customLogger = morgan((tokens, req, res) => {
  return [
    `[${new Date().toISOString()}]`,
    tokens.method(req, res),
    tokens.url(req, res),
    '-',
    tokens.status(req, res),
    tokens['response-time'](req, res), 'ms',
    '|',
    'Source:', getCallerInfo() 
  ].join(' ');
});

module.exports = customLogger;
