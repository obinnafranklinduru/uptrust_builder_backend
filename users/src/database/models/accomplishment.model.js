const mongoose = require('mongoose');

const accomplishmentSchema = new mongoose.Schema({
    publications: [{ title: { type: String }, description: { type: String } }],
    certifications: [{ title: { type: String }, description: { type: String } }],
    projects: [{ title: { type: String }, description: { type: String } }],
    honorsAwards: [{ title: { type: String }, description: { type: String } }],
    languages: [{
        name: { type: String },
        proficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Fluent'] }
    }],
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('Accomplishment', accomplishmentSchema);