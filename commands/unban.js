const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    const noUser = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription(`<:error:699248078875787404> I was not able to find this user`)

    const noPerms = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription("<:error:699248078875787404> You dont have permissions")

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(noPerms)

    const user = args[0];
    if (!user) return message.channel.send(noUser)

    const resolved = bot.users.get(user)

    const success = new Discord.RichEmbed()
        .setColor("GREEN")
        .setDescription(`<:success:699248078846427186> You unbanned ${resolved.tag}`)

    const fail = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription(`<:error:699248078875787404> ${resolved.tag} is not banned`)

    message.guild.unban(user).then(() => {
        message.channel.send(success).then((msg) => {
            msg.delete(5000)
        })
    }).catch(() => {
        message.channel.send(fail)
    })

}

exports.conf = {
    aliases: ["pardon"]
};

exports.help = {
    name: "unban"
}