const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');

const { user } = require('./api');
const ErrorHandler = require('./utils/error-handler');

/**
 * Configure the Express application.
 * @param {Object} app - Express application instance.
 * @param {amqplib.Channel} channel - Message broker channel
 */

module.exports = async (app, channel) => {
    try {
        // Security Middlewares Configuration
        app.use(helmet()); // set security HTTP headers
        app.use(cors()); // Enable CORS for handling cross-origin requests
        app.options('/*', cors());
        app.use(compression()); // gzip compression
        app.use(express.json()); // Enable JSON parsing for request bodies
        app.use(express.urlencoded({ extended: true })); // Enable parse urlencoded request body
        app.use(mongoSanitize()); // sanitize request data
        app.use(hpp()); // protect against HTTP Parameter Pollution attacks

        // Configure user-related routes and middleware
        user(app, channel)

        // error handler
        app.use(ErrorHandler)
    } catch (error) {
        console.error('Error configuring the Express application:', error);
        process.exit(1);
    }
};