/**
 * utils/logger.js
 * Minimal timestamped logger. Swap for a library like winston/pino
 * later without touching call sites elsewhere in the app.
 */
function timestamp() {
  return new Date().toISOString();
}

module.exports = {
  info: (...args) => console.log(`[${timestamp()}] INFO:`, ...args),
  warn: (...args) => console.warn(`[${timestamp()}] WARN:`, ...args),
  error: (...args) => console.error(`[${timestamp()}] ERROR:`, ...args)
};
