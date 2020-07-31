const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

  let guild_id = args[0];
  if (!guild_id) return message.channel.send("⛔ You are missing arguments")

  let guild = bot.guilds.get(guild_id);

  if (!guild) return;

  message.channel.send("✅ **Successfully removed from the server**");
  guild.owner.send("**The bot has been removed from your server by the Developers**.").then(() => {
    guild.leave();
  })

}

exports.conf = {
  aliases: []
};

exports.help = {
  name: "remove"
}