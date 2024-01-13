const UserService = require("../services/user-service");
const { SubscribeMessage } = require("../utils");
const {
    userSignupSchema,
    verificationCodeSchema,
} = require("./validations")

module.exports = (app, channel) => {
    const service = new UserService();

    // Subscribe to messages using the channel and service
    SubscribeMessage(channel, service);

    // Route for user registration (sign up)
    app.post('/signup', async (req, res, next) => {
        try {
            const { error, value } = userSignupSchema.validate(req.body);
            if (error) throw new Error(error);
            const data = await service.signUp(value);
            await service.updateVerificationCode(data.user.id, data.user.email, data.user.firstName);
            res.status(201).json(data);
        } catch (error) {
            console.error('Error in /signup:', error);
        }
    });

    // Route for user login (sign in)
    app.post('/login', async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const data = await service.signIn(email, password);
            res.status(200).json(data);
        } catch (error) {
            console.error('Error in /login:', error);
        }
    });

    app.put('/verify-user', async (req, res, next) => {
        try {
            const { code, userId } = req.body;
            const data = await service.updateVerifyCode(code, userId)
            res.status(200).json(data);
        } catch (error) {
            console.error('Error in /verify-user:', error);
        }
    })

    app.post('/generate-otp', async (req, res, next) => {
        try {
            const { userId } = req.body;
            const result = await service.generateOtpRequest(userId);
            res.json({ success: result, message: 'OTP request sent successfully' });
        } catch (error) {
            console.error('Error in generateOtpRequest route:', error);
        }
    });

    app.post('/forgotten-password', async (req, res, next) => {
        try {
            const { email } = req.body;
            const result = await service.generateOtpForgottenPassword(email);
            res.json({ success: result, message: 'OTP request for forgotten password sent successfully' });
        } catch (error) {
            console.error('Error in generateOtpForgotten route:', error);
        }
    });

    app.post('/password-reset', async (req, res, next) => {
        try {
            const { userId, newPassword } = req.body;
            const result = await service.passwordReset(userId, newPassword);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error in password reset route:', error);
        }
    });

    // Route for a simple 'whoami' message
    app.get('/whoami', (req, res, next) => {
        return res.status(200).json({ msg: '/user : I am User Service' });
    });
};