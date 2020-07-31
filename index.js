const Discord = require("discord.js");
const bot = new Discord.Client();
bot.config = require("./handler/config.json");
const Enmap = require("enmap")
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const token = require("../../etc/token.json")

bot.logger = require("./handler/Logger");

require("./handler/functions.js")(bot);

global.bot = bot;

bot.commands = new Enmap();
bot.aliases = new Enmap();

const init = async () => {

    const cmdFiles = await readdir("./commands/");
    bot.logger.log(`Loading a total of ${cmdFiles.length} commands`);
    cmdFiles.forEach(f => {
        if (!f.endsWith(".js")) return;
        const response = bot.loadCommand(f);
        if (response) console.log(response);
    });

    const evtFiles = await readdir("./events/");
    bot.logger.log(`Loading a total of ${evtFiles.length} events`);
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        const event = require(`./events/${file}`);
        bot.on(eventName, event.bind(null, bot));
        delete require.cache[require.resolve(`./events/${file}`)];
    });

    bot.login(token.token).then(() => {
        bot.logger.mod("Logged in using Discord Services")
    });

};

init();
