const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

  let totalSeconds = (bot.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
  message.channel.send(uptime)

}

exports.conf = {
  aliases: []
};

exports.help = {
  name: "uptime"
}