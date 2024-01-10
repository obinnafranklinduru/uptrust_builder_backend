const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('Recommendation', recommendationSchema);