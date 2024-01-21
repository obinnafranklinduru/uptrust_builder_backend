const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Application Requirement Info
    verified: { type: Boolean, default: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    salt: { type: String },
    phone: { type: String },
    verification_code: { type: String },
    expiry: { type: String },
    deleted: { type: Boolean, default: false },

    // Photos Info
    profilePicture: { type: String },
    backgroundPhoto: { type: String },

    // Basic Contact info
    headline: { type: String },
    summary: { type: String },
    skills: [{ type: String }],
    careerGoals: { type: String },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
    socialMedia: {
        twitter: { type: String },
        linkedin: { type: String },
        facebook: { type: String },
    },
    
    // Professional Info
    accomplishments: { type: mongoose.Schema.Types.ObjectId, ref: 'Accomplishment' },
    education: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Education' }],
    experience: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }],
    recommendations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recommendation' }],
    resumeLink: { type: String },
    interests: {
        companies: [{ type: String }],
        topics: [{ type: String }],
    },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            delete ret.password;
            delete ret.salt;
            delete ret.verification_code;
            delete ret.expiry;
            delete ret.deleted;
        }
    },
    timestamps: true
});

userSchema.index({ email: 1, deleted: 1, _id: 1 }, { unique: true, partialFilterExpression: { deleted: false } });

module.exports = mongoose.model('User', userSchema);