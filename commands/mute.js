const Discord = require("discord.js");
const ms = require("ms");

exports.run = async (bot, message, args) => {

    const noUser = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription(`<:error:699248078875787404> I was not able to find this user`)

    const noPerms = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription("<:error:699248078875787404> You dont have permissions")

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(noPerms)

    let member = bot.resolveMember(args[0], message.guild) || message.mentions.members.first()
    if (!member) return message.channel.send(noUser)

    const nm = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription(`<:error:699248078875787404> I was not able to mute ${member.user.tag}`)

    if (member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(nm)

    let time = args[1]
    if (time) {
        console.log("imhere")
        let support = message.guild.channels.find(c => c.id === "696657664259784804")
        let muterole = message.guild.roles.find(r => r.name == "F2Muted");
        if (!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: "F2Muted",
                    color: "#000000",
                    permissions: []
                })

                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false
                    });
                });

            } catch (e) {
                console.log(e.stack);
            }

        }

        const success = new Discord.RichEmbed()
            .setColor("GREEN")
            .setDescription(`<:success:699248078846427186> You muted ${member.user.tag} for ${ms(ms(time))}`)

        const fail = new Discord.RichEmbed()
            .setColor("ee4747")
            .setDescription(`<:error:699248078875787404> ${member.user.tag} is already muted`)

        const noDms = new Discord.RichEmbed()
            .setColor("ee4747")
            .setDescription("<:error:699248078875787404> Since your dms were closed, so please check <#699310060173656106> court for the format.")

        const courtEmbed = new Discord.RichEmbed()
            .setColor("ee4747")
            .setDescription(`Hello there, ${member.user.tag}\nYou are muted now, thats obviously not great\nI think you want to prove your innocence, so check this format and write a letter.\n**Why you got muted?**\n**Why you want us to unmute you?**\n\nPlease send that in <#699310060173656106>`)

        if (!member.roles.has(muterole.id)) {
            member.addRole(muterole.id, { reason: `${message.author.tag}` }).then(() => {
                message.channel.send(success).then((msg) => {
                    msg.delete(5000)
                })
                member.send(courtEmbed).catch((e) => {
                    support.send(`<@${member.id}>`, noDms)
                })
            })
        } else {
            message.channel.send(fail)
        }

        setTimeout(function () {
            member.removeRole(muterole.id).catch(() => {})
            member.send("You have been unmuted!")
        }, ms(time));

    } else {
        let support = message.guild.channels.find(c => c.id === "696657664259784804")
        let muterole = message.guild.roles.find(r => r.name == "F2Muted");
        if (!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: "F2Muted",
                    color: "#000000",
                    permissions: []
                })

                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false
                    });
                });

            } catch (e) {
                console.log(e.stack);
            }

        }

        const success = new Discord.RichEmbed()
            .setColor("GREEN")
            .setDescription(`<:success:699248078846427186> You muted ${member.user.tag}`)

        const fail = new Discord.RichEmbed()
            .setColor("ee4747")
            .setDescription(`<:error:699248078875787404> ${member.user.tag} is already muted`)

        const noDms = new Discord.RichEmbed()
            .setColor("ee4747")
            .setDescription("<:error:699248078875787404> Since your dms were closed, so please check <#699310060173656106> court for the format.")

        const courtEmbed = new Discord.RichEmbed()
            .setColor("ee4747")
            .setDescription(`Hello there, ${member.user.tag}\nYou are muted now, thats obviously not great\nI think you want to prove your innocence, so check this format and write a letter.\n**Why you got muted?**\n**Why you want us to unmute you?**\n\nPlease send that in <#699310060173656106>`)

        if (!member.roles.has(muterole.id)) {
            member.addRole(muterole.id, { reason: `${message.author.tag}` }).then(() => {
                message.channel.send(success).then((msg) => {
                    msg.delete(5000)
                })
                member.send(courtEmbed).catch((e) => {
                    support.send(`<@${member.id}>`, noDms)
                })
            })
        } else {
            message.channel.send(fail)
        }
    }

}

exports.conf = {
    aliases: []
};

exports.help = {
    name: "mute"
}