const { jwtVerify } = require("@kinde-oss/kinde-node-express");
const { KINDE_DOMAIN } = require("../../config");

/**
 * Middleware to Check if user authenticated.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
module.exports = async (req, res, next) => {
    try {
        const isAuthenticated = await jwtVerify(KINDE_DOMAIN);

        console.log("isAuthenticated", isAuthenticated);

        if (isAuthenticated) {
            // If authorized, proceed to the next middleware or route handler
            return next();
        } else {
            return res.redirect("/login");
        }
    } catch (error) {
        next(error);
    }
};