// @ next() is necessary
const logger = (req, res, next) => {
    console.log(
        `Middleware : ${req.method} ${req.protocol}://${req.get(
            "host"
        )}${req.originalUrl}`
    );
    next();
};

module.exports = logger;
