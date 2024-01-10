const {
    AccomplishmentModel,
    AddressModel,
    EducationModel,
    ExperienceModel,
    RecommendationModel,
    UserModel,
} = require('../models');
const { GenerateSalt, GeneratePassword } = require("../../utils");

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

            return user.save();
        } catch (error) {
            console.log(error)
        }
    }

    async getUserByEmail(email) {
        try {
            console.log(email)
            const user = await UserModel.findOne({ email });

            console.log(user)

            return user;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserRepository;