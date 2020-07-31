const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    const noPerms = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription("<:error:699248078875787404> You dont have permissions")

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(noPerms)

    const end = new Discord.RichEmbed()
        .setColor("GREEN")
        .setDescription("<:success:699248078846427186> The lockdown has ended")
    //

    message.channel.send(end).then((m) => {
        m.delete(5000)
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: true
        })
    })

}

exports.conf = {
    aliases: []
};

exports.help = {
    name: "unlock"
}