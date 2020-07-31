const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    const noUser = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription(`<:error:699248078875787404> I was not able to find this user`)

    const noPerms = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription("<:error:699248078875787404> You dont have permissions")

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(noPerms)

    let member = bot.resolveMember(args[0], message.guild) || message.mentions.members.first()
    if (!member) return message.channel.send(noUser);

    let muterole = message.guild.roles.find(r => r.name == "F2Muted");

    const success = new Discord.RichEmbed()
        .setColor("GREEN")
        .setDescription(`<:success:699248078846427186> You unmuted ${member.user.tag}`)

    const fail = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription(`<:error:699248078875787404> ${member.user.tag} is not muted`)

    if (!member.roles.has(muterole.id)) {
        return message.channel.send(fail)
    } else {
        member.removeRole(muterole.id).then(() => {
            message.channel.send(success).then((msg) => {
                msg.delete(5000)
            })
        })
    }

}

exports.conf = {
    aliases: ["free"]
};

exports.help = {
    name: "unmute"
}