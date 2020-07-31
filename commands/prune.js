const Discord = require("discord.js");

exports.run = async (bot, message, args) => {

    const noArgs = new Discord.RichEmbed()
        .setColor("ee4747")
        .setColor("<:error:699248078875787404> I was not able to find this user")

    const noPerms = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription("<:error:699248078875787404> You dont have permissions")

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(noPerms)

    if (!args[0]) return message.channel.send(noArgs)

    purge(message, args)

}

function purge(message, args) {

    const collecting = new Discord.RichEmbed()
        .setColor("GREEN")
        .setDescription("<:success:699248078846427186> Collecting..")

    const error = new Discord.RichEmbed()
        .setColor("ee4747")
        .setDescription("<:error:699248078875787404> Thats not a number")

    message.channel.send(collecting).then(top => {

        let num = parseInt(args[0]) + 1 || "no"
        if (num === "no") return message.send(error)
        num = parseInt(num) || 10
        if (num < 2) num = 2
        num++
        if (num > 100) num = 100

        message.channel.fetchMessages({
            limit: num
        })
            .then(msgs => {

                msgs = filter(message, msgs)

                const filtering = new Discord.RichEmbed()
                    .setColor("GREEN")
                    .setDescription(`<:success:699248078846427186> Collected ${msgs.size - 2}. Filtering..`)

                top.edit(filtering)
                    .then(top => {

                        message.channel.bulkDelete(msgs, true)

                    })

            })

    })

}

function filter(message, msgs) {

    msgs = msgs.filter(m => {

        let fail = true

        if (message.content.includes(" --b") && !m.author.bot) return false

        if (message.mentions.users.first()) {

            fail = false

            message.mentions.users.forEach(user => {

                if (m.author.id === user.id) fail = true

            })

        }

        if (fail) return true
        return false

    })

    return msgs

}

exports.conf = {
    aliases: ["clear", "purge"]
};

exports.help = {
    name: "prune"
}