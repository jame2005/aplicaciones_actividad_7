const errorHandler = (err, req, res, next) => {
    console.error("ErrorHandler:", err.message || err);

    if (res.headersSent) {
        return next(err);
    }

    const status = err.status || 500;
    const mensaje = err.message || "Error interno del servidor";

    res.status(status).json({
        estado: "error",
        mensaje
    });
};

module.exports = errorHandler;
