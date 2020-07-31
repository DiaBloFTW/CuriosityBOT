const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    const noID = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription(`<:error:699248078875787404> You forgot to provide the message ID`)

    const noUser = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription(`<:error:699248078875787404> You forgot to mention a channel`)

    const noPerms = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription("<:error:699248078875787404> You dont have permissions")

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(noPerms)

    let id = args[1];

    if (!id) return message.channel.send(noID)

    const channel = message.mentions.channels.first() || message.guild.channels.get(args[0]);

    if (!channel) return message.channel.send(noUser)

    let msgs = JSON.parse(args.slice(2).join(' '));

    channel.fetchMessage(id).then(msg => {
        if (msg) msg.edit(msgs);
    });

}

exports.conf = {
    aliases: []
};

exports.help = {
    name: "editembed"
}