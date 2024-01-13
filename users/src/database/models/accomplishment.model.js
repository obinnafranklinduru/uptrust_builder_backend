const mongoose = require('mongoose');

const accomplishmentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    publications: [{
        title: { type: String },
        description: { type: String },
        link: { type: String }
    }],
    certifications: [{
        title: { type: String },
        description: { type: String },
        link: { type: String }
    }],
    projects: [{
        title: { type: String },
        description: { type: String },
        link: { type: String }
    }],
    honorsAwards: [{
        title: { type: String },
        description: { type: String },
        link: { type: String }
    }],
    languages: [{
        name: { type: String },
        proficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Fluent'] }
    }],
    deleted: { type: Boolean, default: false },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamps: true
});


accomplishmentSchema.index({ deleted: 1 });

module.exports = mongoose.model('Accomplishment', accomplishmentSchema);