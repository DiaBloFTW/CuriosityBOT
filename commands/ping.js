const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

  let msgping1 = new Date();

  let botping = new Date() - message.createdAt;

  let msgping2 = new Date() - msgping1;

  let pingembed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .addField('Your Ping', Math.floor(bot.ping) + 'ms')
    .addField('Bot Ping : ', Math.floor(botping) + 'ms')
    .addField('Message Ping : ', '~' + Math.round(msgping2) + 'ms')
    .setTimestamp(new Date())
    .setFooter(`requested by ${message.author.tag}`);


  return message.channel.send(pingembed);

}

exports.conf = {
  aliases: []
};

exports.help = {
  name: "ping"
}