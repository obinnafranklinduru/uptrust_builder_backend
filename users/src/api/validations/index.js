const Joi = require('joi');

module.exports.userSignupSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
        .pattern(new RegExp('^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:\'"<>,./?]).{8,}$'))
        .message('Password must be at least 8 characters long and contain at least one special character.'),
    phone: Joi.string().required()
        .pattern(new RegExp('^[0-9]{11,}$'))
        .message('Phone number must be a numeric string with a maximum length of 15 digits.'),
});

module.exports.userPasswordSchema = Joi.object({
    password: Joi.string().required()
        .pattern(new RegExp('^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:\'"<>,./?]).{8,}$'))
        .message('Password must be at least 8 characters long and contain at least one special character.')
});

module.exports.basicContactSchema = Joi.object({
    headline: Joi.string(),
    summary: Joi.string(),
    skills: Joi.array().items(Joi.string()),
    careerGoals: Joi.string(),
    address: Joi.object({
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required()
    }),
    socialMedia: Joi.object({
        twitter: Joi.string().uri(),
        linkedin: Joi.string().uri(),
        facebook: Joi.string().uri()
    })
});

module.exports.professionalSchema = Joi.object({
    accomplishments: Joi.object({
        publications: Joi.array().items(Joi.object({
            title: Joi.string().required(),
            description: Joi.string(),
            link: Joi.string().uri()
        })),
        certifications: Joi.array().items(Joi.object({
            title: Joi.string().required(),
            description: Joi.string(),
            link: Joi.string().uri()
        })),
        projects: Joi.array().items(Joi.object({
            title: Joi.string().required(),
            description: Joi.string(),
            link: Joi.string().uri()
        })),
        honorsAwards: Joi.array().items(Joi.object({
            title: Joi.string().required(),
            description: Joi.string(),
            link: Joi.string().uri()
        })),
        languages: Joi.array().items(Joi.object({
            name: Joi.string().required(),
            proficiency: Joi.string().valid('Beginner', 'Intermediate', 'Advanced', 'Fluent')
        }))
    }),

    education: Joi.array().items(Joi.object({
        degree: Joi.string().required(),
        institution: Joi.string().required(),
        fieldOfStudy: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        description: Joi.string(),
        website: Joi.string().uri()
    })),

    experience: Joi.array().items(Joi.object({
        jobTitle: Joi.string().required(),
        company: Joi.string().required(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        description: Joi.string(),
        location: Joi.string(),
        locationType: Joi.string().valid('remote', 'hybrid', 'onsite')
    })),

    recommendations: Joi.array().items(Joi.object({
        from: Joi.string().required(),
        text: Joi.string().required()
    })),

    resumeLink: Joi.string().uri(),

    interests: Joi.object({
        companies: Joi.array().items(Joi.string()),
        topics: Joi.array().items(Joi.string())
    })
});

module.exports.photosSchema = Joi.object({
    profilePicture: Joi.string().uri().allow(''),
    backgroundPhoto: Joi.string().uri().allow(''),
});

module.exports.validateData = (data, schema) => {
    const { error, value } = schema.validate(data);
    if (error) {
        throw new Error(`Validation error: ${error.details.map((i) => i.message).join(', ')}`);
    }
    return value;
}