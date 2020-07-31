const reqEvent = (event) => require(`../events/${event}`);

module.exports = (bot) => {
    bot.on("message", reqEvent("message"));
    bot.on("guildCreate", reqEvent("guildCreate"));
    bot.on("ready", () => reqEvent("ready")(bot));
};