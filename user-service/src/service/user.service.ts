import { Request } from "express";
import { plainToClass } from "class-transformer";
import { SuccessResponse, ErrorResponse } from "../utility/response";
import { UserRepository } from "../repository/user.repository";
import { AppValidationError } from "../utility/errors";
import { TimeDifference } from "../utility/dateHelper";
import {
  GetSalt,
  GetHashedPassword,
  ValidatePassword,
  GetToken,
} from "../utility/password";
import {
  SignupInput,
  LoginInput,
  EmailInput,
  VerificationInput,
  UserInput,
  PasswordInput,
} from "../models/dto/user.dto";
import {
  GenerateAccessCode,
  SendVerificationCode,
} from "../utility/notification";
import { autoInjectable } from "tsyringe";

@autoInjectable()
export class UserService {
  repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  // User Creation, Validation & Login
  async CreateUser(request: Request) {
    try {
      const input = plainToClass(SignupInput, request.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(400, error);
      const salt = await GetSalt();
      const hashedPassword = await GetHashedPassword(input.password, salt);
      const data = await this.repository.createAccount({
        email: input.email,
        password: hashedPassword,
        phone: input.phone,
        salt: salt,
      });

      return SuccessResponse({
        _id: data._id,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        phone: data.phone,
      });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async UserLogin(request: Request) {
    try {
      const input = plainToClass(LoginInput, request.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(400, error);
      const data = await this.repository.findAccount(undefined, input.email);
      const verified = await ValidatePassword(
        input.password,
        data.password,
        data.salt
      );
      if (!verified) {
        throw new Error("password does not match!");
      }
      const token = GetToken(data);

      return SuccessResponse({ token });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async GetVerificationToken(request: Request) {
    const payload = request.user;
    if (!payload) return ErrorResponse(403, "authorization failed!");
    const { code, expiry } = GenerateAccessCode();
    await this.repository.updateVerificationCode(
      payload._id as string,
      code,
      expiry.toISOString()
    );

    await SendVerificationCode({
      code,
      email: payload.email,
      option: "ACCESS",
    });

    return SuccessResponse({
      message: "verification code is sent to your registered email address!",
    });
  }

  async VerifyUser(request: Request) {
    const payload = request.user;
    if (!payload) return ErrorResponse(403, "authorization failed!");
    const input = plainToClass(VerificationInput, request.body);
    const error = await AppValidationError(input);
    if (error) return ErrorResponse(400, error);

    const { verification_code, expiry } = await this.repository.findAccount(
      undefined,
      payload.email
    );

    // find the user account
    if (verification_code === parseInt(input.code) && expiry) {
      // check expiry
      const currentTime = new Date();
      const diff = TimeDifference(expiry, currentTime.toISOString(), "m");
      console.log("time diff", diff);

      if (diff > 0) {
        console.log("verified successfully!");
        await this.repository.updateVerifyUser(payload._id as string);
      } else {
        return ErrorResponse(403, "verification code is expired!");
      }
    }
    return SuccessResponse({ message: "user verified!" });
  }

  async ForgottenPassword(request: Request) {
    try {
      const input = plainToClass(EmailInput, request.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(400, error);
      const data = await this.repository.findAccount(undefined, input.email);
      const token = GetToken(data);
      await SendVerificationCode({
        token,
        email: input.email,
        option: "PASSWORD",
      });
      return SuccessResponse({
        message: "verification code is sent to your registered email address!",
      });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async ResetPassword(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const input = plainToClass(PasswordInput, request.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(400, error);
      const salt = await GetSalt();
      const hashedPassword = await GetHashedPassword(input.password, salt);
      console.log(hashedPassword);
      await this.repository.changeUserPassword(
        payload._id as string,
        hashedPassword,
        salt
      );
      return SuccessResponse({ message: "Password is updated!" });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  // User profile
  async UpdateUser(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const input = plainToClass(UserInput, request.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(400, error);
      await this.repository.updateUser(payload._id as string, input);
      return SuccessResponse({ message: "profile created!" });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async GetProfile(request: Request) {
    try {
      const payload = request.user;
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const result = await this.repository.getUserProfile(
        payload._id as string
      );
      return SuccessResponse(result);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
  // Payment Section
  async CreatePaymentMethod(request: Request) {
    return SuccessResponse({ message: "response from Create Payment Method" });
  }

  async GetPaymentMethod(request: Request) {
    return SuccessResponse({ message: "response from Get Payment Method" });
  }

  async UpdatePaymentMethod(request: Request) {
    return SuccessResponse({ message: "response from Update Payment Method" });
  }
}
