const UserService = require("../services/user-service");
const { SubscribeMessage } = require("../utils");

module.exports = (app, channel) => {
    const service = new UserService();

    // Subscribe to messages using the channel and service
    SubscribeMessage(channel, service);

    // Route for user registration (sign up)
    app.post('/signup', async (req, res, next) => {
        try {
            const { email, password, phone, firstName, lastName } = req.body;
            const data = await service.signUp({ email, password, phone, firstName, lastName });
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

    // Route for a simple 'whoami' message
    app.get('/whoami', (req, res, next) => {
        return res.status(200).json({ msg: '/user : I am User Service' });
    });
};