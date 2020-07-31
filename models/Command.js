const mongoose = require("mongoose");

const cmdSchema = mongoose.Schema({
    name: String,
    desc: String,
    ownerOnly: Boolean,
    enabled: Boolean,
    usage: String,
    aliases: Array
});

module.exports = mongoose.model("Command", cmdSchema);