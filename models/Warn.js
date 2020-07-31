const mongoose = require("mongoose");

const warnSchema = mongoose.Schema({
    serverID: Number,
    userID: Number,
    warns: Number,
    warnReasons: Array
});

module.exports = mongoose.model("Warn", warnSchema);