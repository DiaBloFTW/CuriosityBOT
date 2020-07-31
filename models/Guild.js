const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    
    id: String,
    prefix: String,
    deleteCmd: Boolean,
    deleteMedia: Boolean,
    mediaChannel: String,
    autoRole: Boolean,
    autoRoleName: String,
    ignoredChannels: Array,
    suggestionChannel: String,
    suggestionID: String,

});

module.exports = mongoose.model("Guild", guildSchema);