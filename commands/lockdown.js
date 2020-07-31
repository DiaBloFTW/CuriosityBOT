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

    let seconds = args[0];

    let reason = args.slice(1).join(" ")
    if (!reason) {
        reason = "No Reason Provided"
    }

    const success = new Discord.RichEmbed()
        .setColor("GREEN")
        .setDescription(`<:success:699248078846427186> ${reason}`)

    if (seconds) {
        
        message.channel.send(success).then((m) => {
            m.delete(5000)
            let before = m.channel.permissionOverwrites.get(message.guild.id);
            if (before) {
                if (before.allow & 1 << 11) before = true;
                else if (before.deny & 1 << 11) before = false;
                else before = null;
            } else before = null;
            message.channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: false
            }).then(() => {
                let collect = message.channel.createCollector(ms => ms.author.id === message.author.id, {
                    time: seconds * 1000
                });
                setTimeout(function () {
                    m.channel.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: before
                    }).then(() => {
                        m.channel.send(end);
                        collect.stop();
                    })
                }, seconds * 1000);
            })
        });
    } else {
        reason = args.slice(0).join(" ")
        if (!reason) {
            reason = "No Reason Provided"
        }
        const succes1s = new Discord.RichEmbed()
            .setColor("GREEN")
            .setDescription(`<:success:699248078846427186> ${reason}`)

        message.channel.send(succes1s).then((m) => {
            m.delete(5000)
            let before = m.channel.permissionOverwrites.get(message.guild.id);
            if (before) {
                if (before.allow & 1 << 11) before = true;
                else if (before.deny & 1 << 11) before = false;
                else before = null;
            } else before = null;
            message.channel.overwritePermissions(message.guild.id, {
                SEND_MESSAGES: false
            }).then(() => {
                let collect = message.channel.createCollector(ms => ms.author.id === message.author.id, {
                    time: seconds * 1000
                });
                collect.on("message", (msg) => {
                    if (msg.content === "unlock") {
                        m.channel.overwritePermissions(message.guild.id, {
                            SEND_MESSAGES: before
                        }).then(() => {
                            clearTimeout(timer);
                            m.channel.send(end)
                            collect.stop()
                        });
                    }
                })
            })
        });
    }

}

exports.conf = {
    aliases: ["lock"]
};

exports.help = {
    name: "lockdown"
}