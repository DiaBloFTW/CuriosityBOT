const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    const noUser = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription(`<:error:699248078875787404> I was not able to find this user`)

    const noPerms = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription("<:error:699248078875787404> You dont have permissions")

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(noPerms)

    const member = bot.resolveMember(args[0], message.guild) || message.mentions.members.first()
    if (!member) return message.channel.send(noUser)

    const success = new Discord.RichEmbed()
        .setColor("GREEN")
        .setDescription(`<:success:699248078846427186> You kicked ${member.user.tag}`)

    const notAble = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription(`<:error:699248078875787404> I was not able to kick ${member.user.tag}`)

    const youBanned = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription(`<:error:699248078875787404> You got kicked from ${message.author.tag} in ${message.guild.name}`)
    //

    if (!member.kickable) return message.channel.send(notAble)
    if (member.hasPermission("KICK_MEMBERS")) return message.channel.send(notAble)

    let reason = `${message.author.tag} | ${args.slice(1).join(" ")}`
    if (!reason) {
        reason = `${message.author.tag} | No Reason Provided`
    }

    message.guild.kick(member, { reason }).then(() => {
        message.channel.send(success).then((msg) => {
            msg.delete(5000)
        })
        member.send(youBanned)
    })

}

exports.conf = {
    aliases: []
};

exports.help = {
    name: "kick"
}