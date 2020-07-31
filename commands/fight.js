const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

  let sender = bot.resolveUser(args[0]) || message.mentions.users.first()
  if (!sender) {
    sender = message.author;
  }

  var storage =
    [sender + "" + ", " + user + " is fighting, but they hurt themselves in confusion",
    sender + "" + ", " + user + " is fighting with a transformer.",
    sender + "" + ", " + user + " is fighting with a burnt piece of toast",
    sender + "" + ", " + user + " is fighting with poutine.",
    sender + "" + ", " + user + " is fighting, but he fell into a conveniently placed manhole!",
    sender + "" + ", " + user + " is fighting, but they stumbled over their shoelaces"
  ]

  var textpicker = Math.floor(Math.random() * storage.length);

  message.channel.send(storage[textpicker]);

}

exports.conf = {
  aliases: []
};

exports.help = {
  name: "fight"
}