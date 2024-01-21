class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const ErrorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Duplicate key error (e.g., unique constraint violation)
    if (err.code === 11000) {
        let message = 'Duplication error';
        Object.keys(err.keyValue).forEach((key) => {
            message = `${key} already exists`;
        });

        error = new ErrorResponse(message, 400);
    }

    // Handle ZodError
    if (err.name === 'ZodError') {
        const message = err.issues[0].message || 'Validation error';
        error = new ErrorResponse(message, 400);
    }

    // Handle ValidationError
    if (err.name === 'ValidationError') {
        let message = 'Validation error';
        Object.keys(err.errors).forEach((field) => {
            message = err.errors[field].message;
        });
        
        error = new ErrorResponse(message, 400);
    }

    // Handle CastError
    if (err.name === 'CastError') {
        const field = err.path;
        const message = `Invalid ${field}`;
        error = new ErrorResponse(message, 400);
    }
    
    // Handle other common error types
    if (['TypeError', 'SyntaxError', 'StrictPopulateError'].includes(err.name)) {
        const message = err.message;
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Internal server error'
    });
};

module.exports = { ErrorResponse, ErrorHandler };