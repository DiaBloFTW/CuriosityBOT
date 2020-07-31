const mongoose = require("mongoose");

module.exports = async btoa => {

    mongoose.connect("", { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection.on("connected", () => {
        bot.logger.mod("Logged into MongoDB running on stable")
    });

    mongoose.connection.on("err", err => {
        bot.logger.error(`(DB) Mongoose connection error: \n${err}`)
    });

}