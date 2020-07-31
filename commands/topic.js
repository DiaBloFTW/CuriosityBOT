const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    const user = message.mentions.users.first() || message.author;

    message.delete()
    message.channel.send(`> Hello <@${user.id}>, please keep your offtopic talks in <#694043203887824966>, thank you.`)

}

exports.conf = {
    aliases: []
};

exports.help = {
    name: "topic"
}