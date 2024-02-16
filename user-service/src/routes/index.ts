import { Router } from "express";

import { authUser } from "../middleware/auth.middleware";
import {
  CreateUserAddress,
  DeleteAddressById,
  GetAddressById,
  UpdateAddressById,
} from "../controller/address.controller";
import {
  CreateUserEducation,
  DeleteEducationById,
  GetEducationById,
  UpdateEducationById,
} from "../controller/education.controller";
import {
  CreateUserExperience,
  DeleteEdxperienceById,
  GetExperienceById,
  UpdateExperienceById,
} from "../controller/experience.controller";
import {
  CreateUserSkillset,
  DeleteSkillSetById,
  GetSkillSetById,
  UpdateSkillSetById,
} from "../controller/skillset.controller";
import {
  CreateUserSocialHandler,
  DeleteSocialHandlerById,
  GetSocialHandlerById,
  UpdateSocialHandlerById,
} from "../controller/socialhandler.controller";
import {
  EditUser,
  ForgottenUserPassword,
  GetUserProfile,
  GetVerificationCode,
  Login,
  ResetUserPassword,
  SignUp,
  Verify,
} from "../controller/user.controller";

const router = Router();

// Auth & User Routes
router.post("/register", SignUp);
router.post("/login", Login);
router.post("/forgotten-password", ForgottenUserPassword);
router.put("/reset-password", authUser, ResetUserPassword);
router.put("/update-account", authUser, EditUser);
router.get("/profile", authUser, GetUserProfile);
router
  .route("/verify-user")
  .post(authUser, Verify)
  .get(authUser, GetVerificationCode);

// Addresss ROutes
router
  .route("/address")
  .post(authUser, CreateUserAddress)
  .get(authUser, GetAddressById)
  .put(authUser, UpdateAddressById)
  .delete(authUser, DeleteAddressById);

// Education ROutes
router.post("/education", authUser, CreateUserEducation);
router
  .route("/education/:id")
  .get(authUser, GetEducationById)
  .put(authUser, UpdateEducationById)
  .delete(authUser, DeleteEducationById);

// Experience ROutes
router.post("/experience", authUser, CreateUserExperience);
router
  .route("/experience/:id")
  .get(authUser, GetExperienceById)
  .put(authUser, UpdateExperienceById)
  .delete(authUser, DeleteEdxperienceById);

// Skillset ROutes
router.post("/skill-set", authUser, CreateUserSkillset);
router
  .route("/skill-set/:id")
  .get(authUser, GetSkillSetById)
  .put(authUser, UpdateSkillSetById)
  .delete(authUser, DeleteSkillSetById);

// SocialHandler ROutes
router
  .route("/social-handler")
  .post(authUser, CreateUserSocialHandler)
  .get(authUser, GetSocialHandlerById)
  .put(authUser, UpdateSocialHandlerById)
  .delete(authUser, DeleteSocialHandlerById);

export default router;
