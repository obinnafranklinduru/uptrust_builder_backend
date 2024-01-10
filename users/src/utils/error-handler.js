const { createLogger, transports } = require('winston');
const { AppError } = require('./app-errors');

const logErrors = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'app_error.log' })
    ]
});

class ErrorLogger {
    constructor() {}

    async logError(err) {
        console.log('==================== Start Error Logger ===============');

        logErrors.log({
            private: true,
            level: 'error',
            message: `${new Date()}-${JSON.stringify(err)}`
        });

        console.log('==================== End Error Logger ===============');
        return false;
    }

    isTrustedError(error) {
        return error instanceof AppError && error.isOperational;
    }
}

const ErrorHandler = async (err, req, res, next) => {
    const errorLogger = new ErrorLogger();

    process.on('unhandledRejection', (reason, promise) => {
        console.log(reason, 'UNHANDLED');
        throw reason; // need to take care
    });

    process.on('uncaughtException', (err) => {
        errorLogger.logError(err);
    });

    if (err) {
        await errorLogger.logError(err);
        return res.status(err.statusCode).json({ 'message': err.message });
    }
    next();
};

module.exports = ErrorHandler;