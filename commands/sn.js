const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    const user = message.mentions.users.first() || message.author;

    message.delete()
    message.channel.send(`> Hello <@${user.id}>, your username does not comply with our <#695943505511710730>. Feel free to ping a staff for another username on your behalf. If not, the server staff will change the username on their own discretion.`)

}

exports.conf = {
    aliases: []
};

exports.help = {
    name: "sn"
}