const Discord = require(`discord.js`);
const Guild = require(`../models/Guild`);
const Command = require("../models/Command");

exports.run = async (bot, message, args) => {

    let embed = new Discord.RichEmbed() // Embed constructor
        .setColor(`ee4747`)
        .setTitle('Area F2 Commands')
        .setFooter(`Area F2`, `https://cdn.discordapp.com/attachments/697530886660423722/698135670350151750/FB_IMG_1586518897384.jpg`)
        .addField(`📄 Menus`, `\`\`\`⚒️ > This information page\n🔐 > Moderation page\n📰 > Miscellaneous page\`\`\``)
        .addField(`📎 Area F2 Links`, `[Official Discord](https://discord.gg/ExAEEYX) | [Website](https://www.areaf2.com/)`)
        .setTimestamp(message.createdAt)
    //

    const infoss = await getPrefix(message);

    if (!args[0]) return message.channel.send(embed).then(async (msg) => {

        await msg.react(`⚒️`);
        await msg.react(`🔐`);
        await msg.react(`📰`);

        msg.delete(60000).catch();
        const collector = msg.createReactionCollector((reaction, user) => user !== bot.user);

        collector.on('collect', async (messageReaction) => {
            if (messageReaction.emoji.name === `⚒️`) {
                msg.edit(embed)
            }
            if (messageReaction.emoji.name === `🔐`) {
                const two = new Discord.RichEmbed()
                    .setColor(`ee4747`)
                    .setAuthor(`Area F2 Moderation Commands`, message.member.avatarURL)
                    .addField(`🔐 Moderation`, `\`\`\`css\n${infoss}ban [user] [reason]\n${infoss}unban [userID]\n${infoss}unmute [user]\n${infoss}lockdown [seconds] [reason]\n${infoss}prune [number]\n${infoss}mute [user] [seconds]\n${infoss}kick [user] [reason]\n${infoss}warn [user] [reason]\n${infoss}clearwarns [user]\n${infoss}warnlog [user]\`\`\``)
                msg.edit(two)
            }
            if (messageReaction.emoji.name === `📰`) {
                const four = new Discord.RichEmbed()
                    .setColor(`ee4747`)
                    .setAuthor(`Area F2 Misc Commands`, message.member.avatarURL)
                    .addField(`📰 Miscellaneous`, `\`\`\`css\n${infoss}help [command]\n${infoss}slap\n${infoss}byp\n${infoss}sn\n${infoss}lang\n${infoss}topic\n${infoss}avatar\n${infoss}fight\n${infoss}ping\n${infoss}stats\n${infoss}userinfo [user]\n${infoss}uptime\`\`\``)
                msg.edit(four)
            }
            const notbot = messageReaction.users.filter(clientuser => clientuser !== bot.user).first();
            await messageReaction.remove(notbot);
        });
    }).catch(err => console.log(err));

    const cmdName = args[0];
    const infos = await getCommandInfos(cmdName);

    const embedCmd = new Discord.RichEmbed()
        .setColor(`ee4747`)
        .setTitle(`🔰 ${infos[0]}`)
        .setDescription(`🔹 **Description**: ${infos[1]}\n🔹 **Usage**: ${infoss}${infos[2]}`)
    //

    if (cmdName) return message.channel.send(embedCmd)

    async function getCommandInfos(input) {
        try {
            const res = await Command.findOne({
                name: input
            });
            if (!res) return;
            if (res) return [res.name, res.desc, res.usage, res.enabled, res.ownerOnly]
        } catch (e) {
            bot.logger.error(e)
        }
    }

    async function getPrefix(message) {
        try {
            const res = await Guild.findOne({
                id: message.guild.id
            });
            if (!res) return;
            if (res) return res.prefix;
        } catch (e) {
            bot.logger.error(e)
        }
    }

}

exports.conf = {
    aliases: []
};

exports.help = {
    name: "help"
}