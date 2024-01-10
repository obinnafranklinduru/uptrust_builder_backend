const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    phone: { type: String, required: true },
    profilePicture: { type: String },
    backgroundPhoto: { type: String },
    headline: { type: String },
    socialMedia: {
        twitter: { type: String },
        linkedin: { type: String },
        facebook: { type: String },
    },
    summary: { type: String },
    experience: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }],
    education: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Education' }],
    skills: [{ type: String }],
    recommendations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recommendation' }],
    accomplishments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Accomplishment' }],
    interests: {
        companies: [{ type: String }],
        influencers: [{ type: String }],
        topics: [{ type: String }],
    },
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
    careerGoals: { type: String },
    resumeLink: { type: String },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);