const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

  const noUser = new Discord.RichEmbed()
    .setColor("ee4747")
    .setDescription(`<:error:699248078875787404> You forgot to mention a channel`)

  const noPerms = new Discord.RichEmbed()
    .setColor("ee4747")
    .setDescription("<:error:699248078875787404> You dont have permissions")

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(noPerms)

  const channel = message.mentions.channels.first() || message.guild.channels.get(args[0]);

  if (!channel) return message.channel.send(noUser)

  let msg = JSON.parse(args.slice(1).join(' '));
  channel.send(msg);

}

exports.conf = {
  aliases: []
};

exports.help = {
  name: "embed"
}