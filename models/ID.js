const mongoose = require("mongoose");

const idSchema = mongoose.Schema({

    name: String,
    id: String

});

module.exports = mongoose.model("IDsug", idSchema);