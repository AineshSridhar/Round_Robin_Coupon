const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    code: String,
    assigned: Boolean,
});

module.exports = mongoose.model("Coupon", CouponSchema);
