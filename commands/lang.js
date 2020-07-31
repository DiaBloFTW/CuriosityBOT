const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    const user = message.mentions.users.first() || message.author;

    message.delete()
    message.channel.send(`> Please do not use any language other than English in this channel <@${user.id}>, refer to <#694887787177967677> for language channels.`)

}

exports.conf = {
    aliases: []
};

exports.help = {
    name: "lang"
}