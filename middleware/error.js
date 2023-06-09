const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: "failed",
        error: err.message || "Server Error !"
    });

    next();
};

module.exports = errorHandler;
