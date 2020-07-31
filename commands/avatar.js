const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    let user = bot.resolveUser(args[0]) || message.mentions.users.first()
    if (!user) {
        user = message.author
    }
    
    let avatar = user.displayAvatarURL

    let embed = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription(`<:success:699248078846427186> Avatar of ${user.tag}:\n${avatar}`)

    message.channel.send(embed);

}

exports.conf = {
    aliases: ["av"]
};

exports.help = {
    name: "avatar"
}