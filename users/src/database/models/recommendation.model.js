const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
    deleted: { type: Boolean, default: false }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamps: true
});

recommendationSchema.index({ deleted: 1 });

module.exports = mongoose.model('Recommendation', recommendationSchema);