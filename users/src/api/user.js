const UserService = require("../services/user-service");
const { SubscribeMessage } = require("../utils");
const UserAuth = require("./middlewares/auth");
const {
  userSignupSchema,
  basicContactSchema,
  professionalSchema,
  photosSchema,
  userPasswordSchema,
  validateData,
} = require("./validations");

module.exports = (app, channel) => {
  const service = new UserService();

  // Subscribe to messages using the channel and service
  // SubscribeMessage(channel, service);

  // Route for user registration (sign up)
  app.post("/signup", async (req, res, next) => {
    try {
      const value = await validateData(req.body, userSignupSchema);
      const data = await service.signUp(value);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  });

  // Route for user login (sign in)
  app.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const data = await service.signIn(email, password);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/verify-user", UserAuth, async (req, res, next) => {
    try {
      const { userId } = req.user;
      const data = await service.getVerificationCode(userId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post("/verify-user", UserAuth, async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { code } = req.body;
      const data = await service.verifyCode(code, userId);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post("/forgotten-password", async (req, res, next) => {
    try {
      const { email } = req.body;
      const result = await service.generateOtpForgottenPassword(email);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  app.post("/password-reset", UserAuth, async (req, res, next) => {
    try {
      const { userId } = req.user;
      const newPassword = await validateData(req.body, userPasswordSchema);
      const result = await service.passwordReset(userId, newPassword);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  app.post("/update-profile", UserAuth, async (req, res, next) => {
    try {
      const { userId } = req.user;
      const data = await validateData(req.body, basicContactSchema);
      const result = await service.updateUserProfile(userId, data);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  app.post("/update-professional", UserAuth, async (req, res, next) => {
    try {
      const { userId } = req.user;
      const data = await validateData(req.body, professionalSchema);
      const result = await service.updateProfessional(userId, data);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  app.post("/update-profile-photos", UserAuth, async (req, res, next) => {
    try {
      const { userId } = req.user;
      const data = await validateData(req.body, photosSchema);
      const result = await service.updateUserProfilePhotos(userId, data);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

  // Route for a simple 'whoami' message
  app.get("/whoami", (req, res, next) => {
    return res.status(200).json({ msg: "/user : I am User Service" });
  });
};
