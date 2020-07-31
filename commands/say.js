const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    const noPerms = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription("<:error:699248078875787404> You are missing permissions")

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(noPerms)

    let say = args.slice(1).join(' ');

    if (say) say = channel.send(say) 
    else return;

}

exports.conf = {
    aliases: []
};

exports.help = {
    name: "say"
}