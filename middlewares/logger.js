const morgan = require('morgan');

// Create custom log format with time, method, url, status and response time
const customLogger = morgan((tokens, req, res) => {
  return [
    `[${new Date().toISOString()}]`,
    tokens.method(req, res),
    tokens.url(req, res),
    '-',
    tokens.status(req, res),
    tokens['response-time'](req, res), 'ms'
  ].join(' ');
});

module.exports = customLogger;
