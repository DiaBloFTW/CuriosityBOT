const Discord = require("discord.js");
const Warn = require("../models/Warn");
const mongoose = require("mongoose");
const ms = require("ms");

exports.run = async (bot, message, args) => {

    const noUser = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription(`<:error:699248078875787404> I was not able to find this user`)

    const noPerms = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription("<:error:699248078875787404> You dont have permissions")

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(noPerms)

    let reason = `**${args.slice(1).join(" ")}** | ${message.author.tag}`
    if (!args[1]) {
        reason = `**No Reason** | ${message.author.tag}`
    }

    const member = bot.resolveMember(args[0], message.guild) || message.mentions.members.first();
    if (!member) return message.channel.send(noUser)
    if (member.id == message.author.id) return;

    const nm = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription(`<:error:699248078875787404> I was not able to warn ${member.user.tag}`)

    if (member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(nm)

    const infos = await getWarns(message.guild, member)

    const mute = new Discord.RichEmbed()
        .setColor("GREEN")
        .setDescription(`<:success:699248078846427186> Permissible warnings have been exceeded, therefor ${member.user.tag} got muted for 24 hours`)

    const kicked = new Discord.RichEmbed()
        .setColor("GREEN")
        .setDescription(`<:success:699248078846427186> Permissible warnings have been exceeded, therefor ${member.user.tag} got kicked`)

    const banned = new Discord.RichEmbed()
        .setColor("GREEN")
        .setDescription(`<:success:699248078846427186> Permissible warnings have been exceeded, therefor ${member.user.tag} got banned for 7 days & warns have been reseted`)

    const success = new Discord.RichEmbed()
        .setColor("GREEN")
        .setDescription(`<:success:699248078846427186> You warned ${member.user.tag}`)

    await newWarn(message.guild, member, reason).then(() => {
        message.channel.send(success).then((msg) => {
            msg.delete(5000)
        })
    })

    if (infos >= 2) {
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

        member.addRole(muterole.id).then(() => {
            message.channel.send(mute)
        })

        setTimeout(function () {
            member.removeRole(muterole.id);
        }, ms(84000000));

    } else if (infos >= 3) {
        await message.guild.kick({
            reason: `Permissible warnings have been exceeded | ${member.user.tag}`
        }).then(() => {
            message.channel.send(kicked)
        })
    } else if (infos >= 4) {
        message.guild.ban(member, {
            days: 7,
            reason: `Permissible warnings have been exceeded | ${member.user.tag}`
        }).then(() => {
            message.channel.send(banned)
        });
        await deleteWarns(message.guild, member);
    }

}

async function newWarn(server, user, value) {
    try {
        const res = await Warn.findOne({
            serverID: server.id,
            userID: user.id
        });
        if (!res) {
            const newModel = new Warn({
                serverID: server.id,
                userID: user.id,
                warns: 1,
                warnReasons: [value]
            })

            newModel.save()
        }
        if (res) {
            res.warns += 1
            res.warnReasons.push(value)
            res.save()
        }
    } catch (e) {
        console.log(e)
    }
};

async function getWarns(server, user) {
    try {
        const res = await Warn.findOne({
            serverID: server.id,
            userID: user.id
        });
        if (!res) return;
        if (res) return res.warns;
    } catch (e) {
        console.log(e)
    }
};

async function deleteWarns(server, user) {
    try {
        const res = await Warn.findOneAndDelete({
            serverID: server.id,
            userID: user.id
        });
        if (!res) return;
    } catch (e) {
        console.log(e)
    }
};

exports.conf = {
    aliases: []
}

exports.help = {
    name: "warn"
}