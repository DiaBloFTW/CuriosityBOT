const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    bot.guilds.forEach(guild => {
        message.channel.send('🛡️ ❯ ' + guild.name + '\n' + '🆔 ❯ ' + guild.id)
    })

}

exports.conf = {
    aliases: []
};

exports.help = {
    name: "servers"
}