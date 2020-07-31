const Discord = require('discord.js');
const moment = require("moment");

let team = {
  neax: "285887620813160450"
}

exports.run = async (bot, message, args) => {

  let user = bot.resolveUser(args[0]) || message.mentions.users.first()
  if (!user) {
    user = message.author
  }

  const member = message.guild.member(user);

  const embed = new Discord.RichEmbed()
    .setColor("#ee4747")
    .setThumbnail(user.displayAvatarURL)
    .setAuthor(`Informations about ${user.username}#${user.discriminator}`, user.displayAvatarURL)
    .setDescription(`${user}`)
    .addField("Status", `${user.presence.status}`, true)
    .addField("Created At", `${moment.utc(user.createdAt).format("MM/DD/YYYY h:mm A")}`, true)
    .addBlankField(true)
    .addField("Name", `${user.username}#${user.discriminator}`, true)
    .addField("Joined Server", `${moment.utc(member.joinedAt).format("MM/DD/YYYY h:mm A")}`, true)
    .addBlankField(true)
    .addField("Bot", `${user.bot}`, true)
    .addField("Game", `${user.presence.game ? user.presence.game.name : "None"}`, true)
    .addBlankField(true)
    .addField("ID", `${user.id}`, true)
    .addField("Status", member.user.presence.status, true)
    .addBlankField(true)
    .addField(`Roles [${member.roles.size}]`, member.roles.map(roles => `${roles}`).join(" | ") || NaN);

  if (team.neax.includes(user.id)) {
    embed.addField("Area F2 Staff", "Bot Developer", true);
  }

  embed.setTimestamp();
  embed.setFooter(`ID: ${user.id}`);


  message.channel.send(embed);

}

exports.conf = {
  aliases: []
};

exports.help = {
  name: "userinfo"
}