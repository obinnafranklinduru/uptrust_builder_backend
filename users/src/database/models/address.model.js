const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    deleted: { type: Boolean, default: false },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamps: true
});

addressSchema.index({ deleted: 1 });

module.exports = mongoose.model('Address', addressSchema);