const mongoose = require("mongoose");

const ClaimRecordSchema = new mongoose.Schema({
    ip: String,
    session: String,
    claimTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ClaimRecord", ClaimRecordSchema);
