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
      const user = await this.repository.CreateAccount(userData);
      return { id: user._id, email: user.email, phone: user.phone };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async signIn(email, password) {
    try {
      const user = await this.repository.FindAccount(email);
      if (!user) throw new Error("Invalid Credentials");

      const isValidPassword = await ValidatePassword(
        password,
        user.password,
        user.salt
      );
      if (!isValidPassword) throw new Error("Invalid Credentials");

      const token = await this.generateToken(user);
      return { token };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getVerificationCode(userId) {
    try {
      const user = await this.repository.StoreVerificationCode(userId);
      await sendMail({
        code: user.verification_code,
        email: user.email,
        name: user.firstName,
      });
      return {
        message: "Verification code is sent to your registered email address",
      };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async verifyCode(code, userId) {
    try {
      await this.repository.VerifyUser(code, userId);
      return {
        message: "User is verified successful",
      };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async generateOtpForgottenPassword(email) {
    try {
      const user = await this.repository.GenerateOtpForgottenPass(email);
      await sendMail({
        code: user.verification_code,
        email: user.email,
        name: user.firstName,
      });

      return {
        message: "Verification code is sent to your registered email address",
      };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async passwordReset(userId, newPassword) {
    try {
      await this.repository.PasswordReset(userId, newPassword);

      return {
        message: "Password changed successfully, Kindly login again",
      };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async generateToken(user) {
    try {
      const payload = { userId: user._id, email: user.email };
      return GenerateSignature(payload);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async updateUserProfile(userId, userData) {
    try {
      const user = await this.repository.UpdateBasicContact(userId, userData);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async updateProfessional(userId, userData) {
    try {
      const user = await this.repository.UpdateProfessional(userId, userData);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async updateUserProfilePhotos(userId, userData) {
    try {
      const user = await this.repository.UpdatePhotos(userId, userData);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
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
