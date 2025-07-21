const morgan = require('morgan');


morgan.token('user', (req) => {
  if (req.user) {
    return `User: ${req.user.name} (id: ${req.user.id})`;
  }
  return 'User: anonymous';
});

// Create custom log format with time, method, url, status and response time
const customLogger = morgan((tokens, req, res) => {
  return [
    `[${new Date().toISOString()}]`,
    tokens.method(req, res),
    tokens.url(req, res),
    '-',
    tokens.status(req, res),
    tokens['response-time'](req, res), 'ms',
    '|',
    tokens.user(req) // 👈 add user info
  ].join(' ');
});
module.exports = customLogger;
