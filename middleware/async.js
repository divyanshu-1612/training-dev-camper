const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const asyncHandlers = () => () => console.log("xyz");

module.exports = asyncHandler;
