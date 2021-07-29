const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
// https://expressjs.com/en/guide/error-handling.html#error-handling
