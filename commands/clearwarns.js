const Discord = require("discord.js");
const Warn = require("../models/Warn");
const mongoose = require("mongoose");
const ms = require("ms");

exports.run = async (mod, message, args) => {

    const noUser = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription(`<:error:699248078875787404> I was not able to find this user`)

    const noPerms = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription("<:error:699248078875787404> You dont have permissions")

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(noPerms)

    const user = bot.resolveUser(args[0]) || message.mentions.users.first()
    if (!user) return message.channel.send(noUser)

    const fail = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription(`<:error:699248078875787404> ${user.tag} has no warnings`)

    const success = new Discord.RichEmbed()
        .setColor("GREEN")
        .setDescription(`<:success:699248078846427186> You cleared all warnings from ${user.tag}`)

    await clearWarns(message, message.guild, user, fail, success)

};

async function clearWarns(message, server, user, failure, success) {
    try {
        const res = await Warn.findOneAndDelete({
            serverID: server.id,
            userID: user.id
        });
        if (!res) return message.channel.send(failure);
        if (res) return message.channel.send(success).then((msg) => {
            msg.delete(5000)
        })
    } catch (e) {
        console.log(e)
    }
}

exports.conf = {
    aliases: ["cw"]
};

exports.help = {
    name: "clearwarns"
}