const Discord = require("discord.js");
const Warn = require("../models/Warn");
const mongoose = require("mongoose");

exports.run = async (mod, message, args) => {

    let user = bot.resolveUser(args[0]) || message.mentions.users.first()
    if (!user) {
        user = message.author
    }

    const infos = await getWarns(message, message.guild, user)

    const embed = new Discord.RichEmbed()
        .setColor(0xEE4747)
        .setTitle(`Warnlog of ${user.tag}`)
        .addField("__Warnings__", infos)
        .setThumbnail(user.displayAvatarURL)
        .setFooter(`${user.id}`, mod.user.displayAvatarURL)
    message.channel.send(embed)

}

async function getWarns (message, server, user) {
    try {
        const res = await Warn.findOne({
            serverID: server.id,
            userID: user.id
        });
        if (!res) return "**No warnings**";
        if (res) return res.warnReasons;
    } catch (e) {
        console.log(e)
    }
}

exports.conf = {
    aliases: ["warns", "warnings"]
};

exports.help = {
    name: "warnlog"
}