const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    degree: { type: String },
    institution: { type: String },
    fieldOfStudy: { type: String },
    startDate: { type: Date },
    graduationDate: { type: Date },
    activitiesAndSocieties: { type: String },
    description: { type: String },
    website: { type: String },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('Education', educationSchema);