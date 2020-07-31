const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    const user = message.mentions.users.first() || message.author;

    message.delete()
    message.channel.send(`> <@${user.id}>, please refrain yourself from bypassing the censored words, this can lead to a mute. Bypassing several times can lead to a kick!`)

}

exports.conf = {
    aliases: []
};

exports.help = {
    name: "byp"
}