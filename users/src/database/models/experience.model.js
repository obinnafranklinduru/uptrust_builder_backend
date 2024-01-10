const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    jobTitle: { type: String },
    company: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
    location: { type: String },
    locationType: {
        type: String,
        enum: ['remote', 'hybrid', 'onsite'],
    },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('Experience', experienceSchema);