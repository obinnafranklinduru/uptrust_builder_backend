const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
    deleted: { type: Boolean, default: false }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamps: true
});

experienceSchema.index({ deleted: 1 });

module.exports = mongoose.model('Experience', experienceSchema);