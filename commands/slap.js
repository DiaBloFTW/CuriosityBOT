const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    let user = bot.resolveUser(args[0]) || message.mentions.users.first()
    if (!user) {
        user = message.author
    }

    let embed = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription(`<@${message.author.id}> slapped <@${user.id}>`)
        .setImage("https://cdn.discordapp.com/attachments/680756392180842767/681545093139922984/tenor-1.gif")

    message.channel.send(embed);

}

exports.conf = {
    aliases: []
};

exports.help = {
    name: "slap"
}