const { UserRepository } = require("../database");
const { GenerateSignature, ValidatePassword } = require("../utils");

// Business logic for user-related operations
class UserService {
    
    constructor() {
        this.repository = new UserRepository();
    }

    async signUp(userData) {
        try {
            const newUser = await this.repository.createUser(userData);

            const token = await this.generateToken(newUser);
            return { user: newUser, token };
        } catch (error) {
            console.log(error);
        }
    }

    async signIn(email, password) {
        try {
            const user = await this.repository.getUserByEmail(email);

            console.log("user", user)

            if (!user) {
                throw new Error('User not found');
            }

            const isValidPassword = await ValidatePassword(password, user.password, user.salt);

            if (!isValidPassword) {
                throw new Error('Invalid password');
            }

            const token = await this.generateToken(user);
            return { user, token };
        } catch (error) {
            console.log(error);
        }
    }

    async generateToken(user) {
        const payload = { userId: user._id, email: user.email };
        return GenerateSignature(payload);
    }

    // Subscribe to events related to user actions ()
    async SubscribeEvents(payload) {
        console.log('Triggering.... User Events')

        // Parse the payload to extract event and data
        const { event, data } = JSON.parse(payload);
        const { } = data;

        // Perform actions based on the received event
        switch (event) {
            default:
                break;
        }
    }
}

module.exports = UserService;