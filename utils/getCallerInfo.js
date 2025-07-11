module.exports = function getCallerInfo() {
  const err = new Error();
  const stackLines = err.stack.split('\n');

  // Find the first non-node/internal line (usually index 3 or 4)
  const targetLine = stackLines[3] || stackLines[2] || '';
  const match = targetLine.match(/\((.*):(\d+):(\d+)\)/);

  if (!match) return '';

  const [, file, line, col] = match;
  return `${file.split('/').slice(-2).join('/')}@${line}:${col}`;
};
