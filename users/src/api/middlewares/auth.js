// const { jwtVerify } = require("@kinde-oss/kinde-node-express");
// const { KINDE_DOMAIN } = require("../../config");

const { ValidateSignature } = require('../../utils');

/**
 * Middleware to Check if user authenticated.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
module.exports = async (req, res, next) => {
    try {

        const isAuthenticated = await ValidateSignature(req)
        // const isAuthenticated = await jwtVerify(KINDE_DOMAIN);

        console.log("isAuthenticated", isAuthenticated);

        if (isAuthenticated) {
            return next();
        } else {
            return res.redirect("/login");
        }
    } catch (error) {
        next(error);
    }
};