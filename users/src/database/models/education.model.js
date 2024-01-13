const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    degree: { type: String },
    institution: { type: String },
    fieldOfStudy: { type: String },
    startDate: { type: Date },
    graduationDate: { type: Date },
    description: { type: String },
    website: { type: String },
    deleted: { type: Boolean, default: false }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamps: true
});

educationSchema.index({ deleted: 1 });

module.exports = mongoose.model('Education', educationSchema);