const { UserRepository } = require("../database");
const { GenerateSignature, ValidatePassword } = require("../utils");
const { GenerateAccessCode, sendMail } = require("../utils/notification");

// Business logic for user-related operations
class UserService {
    
    constructor() {
        this.repository = new UserRepository();
    }

    async signUp(userData) {
        try {
            const newUser = await this.repository.createUser(userData);
            const token = await this.generateToken(newUser);
            return {
                token,
                user: {
                    id: newUser._id,
                    verified: newUser.verified,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    phone: newUser.phone,
                }
            };
        } catch (error) {
            console.log(error);
        }
    }

    async updateVerificationCode(userId, email, name) {
        try {
            const { code } = await this.repository.updateVerificationCode(userId);
            await sendMail(code, email, name);
            return true;
        } catch (error) {
            console.error('Error updating verification code:', error);
            throw error;
        }
    }

    async generateOtpRequest(userId) {
        try {
            const { code, email, name } = await this.repository.generateOtpRequest(userId);
            await sendMail(code, user.email, user.name);
            return true;
        } catch (error) {
            console.error('Error generating OTP request:', error);
            throw error;
        }
    }

    async signIn(email, password) {
        try {
            const user = await this.repository.getUserByEmail(email);

            if (!user) throw new Error('Invalid Credentials');

            const isValidPassword = await ValidatePassword(password, user.password, user.salt);

            if (!isValidPassword) throw new Error('Invalid Credentials');

            const token = await this.generateToken(user);

            return {
                token,
                user: {
                    id: user._id,
                    verified: user.verified,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                }
            };
        } catch (error) {
            console.log(error);
        }
    }

    async updateVerifyCode(code, userId) {
        try {
            const user = await this.repository.updateVerifyUser(code, userId);
            const token = await this.generateToken(user);
            return {
                token,
                user: {
                    id: user._id,
                    verified: user.verified,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                }
            };
        } catch (error) {
            console.error('Error verifying user:', error);
            throw error;
        }
    }

    async generateOtpForgottenPassword(email) {
        try {
            const { code, email, name } = await this.repository.generateOtpForgottenPass(email);
            await sendMail(code, email, name);
            return true;
        } catch (error) {
            console.error('Error generating OTP request:', error);
            throw error;
        }
    }

    async passwordReset(userId, newPassword) {
        try {
            const user = await this.repository.PasswordReset(userId, newPassword);
            const token = await this.generateToken(user);
            return {
                token,
                user: {
                    id: user._id,
                    verified: user.verified,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                }
            };
        } catch (error) {
            console.error('Error generating OTP request:', error);
            throw error;
        }
    }

    async generateToken(user) {
        try {
            const payload = { userId: user._id, email: user.email };
            return GenerateSignature(payload);
        } catch (error) {
            console.error('Error generating OTP request:', error);
            throw error;
        }
    }

    async updateUserProfile(userData) {
        try {
            const user = await createProfile(userData);
            return {
                user: {
                    id: user._id,
                    verified: user.verified,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    address: user.address
                }
            };

        } catch (error) {
            console.error('Error generating OTP request:', error);
            throw error;
        }
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