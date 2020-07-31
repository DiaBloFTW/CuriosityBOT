const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    const noPerms = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription("<:error:699248078875787404> You are missing permissions")

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(noPerms)

    let member = bot.resolveMember(args[0], message.guild) || message.mentions.members.first()

    const msg = args.slice(1).join(' ');

    member.send(msg);

    message.delete().catch();

}

exports.conf = {
    aliases: []
};

exports.help = {
    name: "dm"
}