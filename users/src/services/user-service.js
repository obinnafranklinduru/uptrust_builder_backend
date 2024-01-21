const { UserRepository } = require("../database");
const { GenerateSignature, ValidatePassword } = require("../utils");
const { sendMail } = require("../utils/notification");

// Business logic for user-related operations
class UserService {
    
    constructor() {
        this.repository = new UserRepository();
    }

    async signUp(userData) {
        try {
            const user = await this.repository.createUser(userData);
            const token = await this.generateToken(user);
            return { token, user };
        } catch (error) {
            console.log(error);
        }
    }

    async updateVerificationCode(userId) {
        try {
            const user = await this.repository.updateVerificationCode(userId);
            await sendMail({ 
                code: user.verification_code, 
                email: user.email, 
                name: user.firstName 
            })
            return true;
        } catch (error) {
            console.error('Error updating verification code:', error);
            throw error;
        }
    }

    async generateOtpRequest(userId) {
        try {
            const user = await this.repository.generateOtpRequest(userId);
            await sendMail({ 
                code: user.verification_code, 
                email: user.email, 
                name: user.firstName 
            })
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

            return { token, user };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateVerifyCode(code, userId) {
        try {
            const user = await this.repository.updateVerifyUser(code, userId);
            const token = await this.generateToken(user);
            return { token, user };
        } catch (error) {
            console.error('Error verifying user:', error);
            throw error;
        }
    }

    async generateOtpForgottenPassword(email) {
        try {
            const user = await this.repository.generateOtpForgottenPass(email);
            await sendMail({ 
                code: user.verification_code, 
                email: user.email, 
                name: user.firstName 
            });
            
            return await this.generateToken(user);
        } catch (error) {
            console.error('Error generating OTP request:', error);
            throw error;
        }
    }

    async passwordReset(userId, newPassword) {
        try {
            return await this.repository.PasswordReset(userId, newPassword);
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

    async updateUserProfile(userId, userData) {
        try {
            const user = await this.repository.updateBasicContact(userId, userData);
            return user;
        } catch (error) {
            console.error('Error generating OTP request:', error);
            throw error;
        }
    }

    async updateProfessional(userId, userData) {
        try {
            const user = await this.repository.updateProfessional(userId, userData);
            return user;
        } catch (error) {
            console.error('Error generating OTP request:', error);
            throw error;
        }
    }

    async updateUserProfilePhotos(userId, userData) {
        try {
            const user = await this.repository.updatePhotos(userId, userData);
            return user;
        } catch (error) {
            console.error('Error generating OTP request:', error);
            throw error;
        }
    }
    // Subscribe to events related to user actions ()
    // async SubscribeEvents(payload) {
    //     console.log('Triggering.... User Events')

    //     // Parse the payload to extract event and data
    //     const { event, data } = JSON.parse(payload);
    //     const { } = data;

    //     // Perform actions based on the received event
    //     switch (event) {
    //         default:
    //             break;
    //     }
    // }
}

module.exports = UserService;