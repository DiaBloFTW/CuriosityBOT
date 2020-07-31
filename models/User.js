const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    id: String,
    guildId: String,
    afk: String,
    token: String,
});

module.exports = mongoose.model("User", userSchema);