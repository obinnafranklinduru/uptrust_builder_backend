const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports = mongoose.model('Address', AddressSchema);