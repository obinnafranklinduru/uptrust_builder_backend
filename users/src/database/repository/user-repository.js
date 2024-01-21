const {
    AccomplishmentModel,
    AddressModel,
    EducationModel,
    ExperienceModel,
    RecommendationModel,
    UserModel,
} = require('../models');
const { GenerateSalt, GeneratePassword } = require("../../utils");
const { GenerateAccessCode }= require("../../utils/notification");

// Repository handling database operations for users
class UserRepository {
    async createUser(userData) {
        try {
            const salt = await GenerateSalt();
            const hashedPassword = await GeneratePassword(userData.password, salt);

            const user = new UserModel({
                ...userData,
                password: hashedPassword,
                salt: salt,
            });

            return await user.save();
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error(error.message);
        }
    }

    async updateVerificationCode(userId) {
        try {
            const { code, expiry } = GenerateAccessCode();

            const user = await UserModel.findOneAndUpdate(
                { _id: userId, verified: false, deleted: false },
                { verification_code: code, expiry },
                { new: true }
            );
            if (!user) throw new Error("User already verified!");
            return user; 
        } catch (error) {
            console.error('Error updating verification code:', error);
            throw new Error(error.message);
        }
    }

    async updateVerifyUser(code, userId) {
        try {
            const user = await UserModel.findOne({ _id: userId, verification_code: code });
            if (!user) throw new Error('Code is invalid');

            // Check if the OTP has not expired
            const currentTimestamp = new Date().getTime();
            if (user.verification_code && currentTimestamp > user.expiry) throw new Error('OTP has expired');

            // Update the user's verification status
            user.verified = true;
            user.verification_code = "";
            user.expiry = "";

            // Save the updated user
            return await user.save();
        } catch (error) {
            console.error(error.message);
        }
    }

    async getUserByEmail(email) {
        try {
            return await UserModel.findOne({ email });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async generateOtpRequest(userId) {
        try {
            const user = await UserModel.findById(userId);
            if (!user) throw new Error('User not found');

            // Check if the OTP has expired or is empty
            const currentTimestamp = new Date().getTime();
            if (!user.verification_code || currentTimestamp > user.expiry) {
                const { code, expiry } = GenerateAccessCode();

                // Update user fields
                user.verification_code = code;
                user.expiry = expiry;
                user.verified = false;

                // Save the updated user
                return await user.save();
            } else {
                throw new Error('OTP request already sent; wait for some minutes');
            }
        } catch (error) {
            console.error('Error generating OTP request:', error);
            throw new Error(error.message);
        }
    }

    async generateOtpForgottenPass(email) {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) throw new Error('User not found');

            const { code, expiry } = GenerateAccessCode();

            // Update user fields
            user.verification_code = code;
            user.expiry = expiry;
            user.verified = false;

            // Save the updated user
            return await user.save();
        } catch (error) {
            console.error('Error generating OTP request:', error);
            throw new Error(error.message);
        }
    }

    async PasswordReset(userId, { password }) {
        try {
            const salt = await GenerateSalt();
            const hashedPassword = await GeneratePassword(password, salt);

            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: userId, verified: true },
                { password: hashedPassword, salt },
                { new: true }
            );
            
            if (!updatedUser) throw new Error("User not verified!")
            return updatedUser;
        } catch (error) {
            console.log(error);
        }
    }

    async updateBasicContact(userId, data) {
        try {
            const update = {};

            if (data.headline) update.headline = data.headline;
            if (data.summary) update.summary = data.summary;
            if (data.careerGoals) update.careerGoals = data.careerGoals;
            if (data.skills) update.skills = data.skills;
            if (data.socialMedia) update.socialMedia = data.socialMedia;

            if (data.address) {
                // Create new address object
                const address = await AddressModel.create({
                    user_id: userId,
                    ...data.address
                });

                update.address = [address._id];
            }

            return await UserModel.findOneAndUpdate(
                { _id: userId },
                update,
                { new: true }
            );
        } catch (error) {
            throw new Error("Error updating user!");
        }
    }

    async updateProfessional(userId, data) {
        try {
            const update = {};

            console.log("DataModel -> ", data);
            // console.log("AccModel -> ", ...data.accomplishments);
            // console.log("PublicModel -> ", data.accomplishments.publications);

            // if (data.accomplishments) {
            //     // Create accomplishment object
            //     const accomplishment = await AccomplishmentModel.create({
            //         user_id: userId,
            //         ...data.accomplishments
            //     });
    
            //     update.accomplishments = accomplishment._id;
            // }

            // if (data.education) {
            //     // Create education objects
            //     const educations = data.education.map(edu => ({
            //         user_id: userId,
            //         ...edu
            //     }));
    
            //     const newEducations = await EducationModel.create(educations);
    
            //     update.education = newEducations.map(edu => edu._id);
            // }

            // if (data.experience) {
            //     // Create experience objects
            //     const experiences = data.experience.map(exp => ({
            //         user_id: userId,
            //         ...exp
            //     }));

            //     const newExperiences = await ExperienceModel.create(experiences);

            //     update.experience = newExperiences.map(exp => exp._id);
            // }

            if (data.recommendations) {
                // Create recommendation objects
                const recommendations = data.recommendations.map(rec => ({
                    from: rec.from,
                    text: rec.text
                }));

                const newRecs = await RecommendationModel.create(recommendations);

                update.recommendations = newRecs.map(rec => rec._id);
            }

            // if (data.resumeLink) update.resumeLink = data.resumeLink;
            // if (data.interests) update.interests = data.interests;

            return await UserModel.findOneAndUpdate(
                { _id: userId },
                update,
                { new: true }
            );
        } catch (error) {
            throw new Error("Error updating user!");
        }
    }

    async updatePhotos(userId, data) {
        try {
            const update = {};
            if (data.profilePicture) update.profilePicture = data.profilePicture;
            if (data.backgroundPhoto) update.backgroundPhoto = data.backgroundPhoto;
            return await User.findByIdAndUpdate(userId, update);
        } catch (error) {
            throw new Error("Error updating user!");
        }
    }
}

module.exports = UserRepository;