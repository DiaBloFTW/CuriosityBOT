const mongoose = require("mongoose");
const Guild = require("../models/Guild");
const Command = require("../models/Command");
const User = require("../models/User")
const ID = require("../models/ID")
const owners = "285887620813160450"
const Discord = require("discord.js")
module.exports = async (bot, message) => {

    function genToken() {
        let token = "";
        let characters = "1234567890"
        for (let i = 0; i < 6; i++) {
            token += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return token;
    }

    await createUser(message.author, message.guild, genToken())

    const infos = await findOrCreateGuild(message.guild);

    const prefix = infos[0]

    if (!message.guild) return;

    if (message.channel.id === infos[3] && infos[2] == true) {
        if (message.attachments.size > 0) {

        } else {
            message.delete(10)
        }
    }

    if (infos[1] == "true") {
        message.delete(10)
    }

    const sugChan = await findOrCreateGuild(message.guild)

    if (message.channel.id === sugChan[5]) {
        let id = message.content.toString()
        await saveID(id)
        message.delete()
    }

    if (message.channel.id === sugChan[4]) {
        const input = message.content.toString()

        const modChannel = message.guild.channels.find(c => c.id === "699346751299125269")

        const embed = new Discord.RichEmbed()
            .setColor("ee4747")
            .setTitle("Suggestions and Feedback")
            .setDescription(input)
            .setTimestamp()
        modChannel.send(embed).then(async (msg) => {

            const collector = msg.createReactionCollector((reaction, user) => user !== bot.user);
            const reaction1 = bot.emojis.get("699248078846427186")
            const reaction2 = bot.emojis.get("699248078875787404")
            await msg.react(reaction1)
            await msg.react(reaction2)

            collector.on('collect', async (messageReaction) => {
                if (messageReaction.emoji.id === "699248078846427186") {

                    msg.delete()
                    const channel = message.guild.channels.find(c => c.id === "699347945484714054")
                    channel.send(embed).then(async (msgg) => {
                        await msgg.react("⬆️")
                        await msgg.react("⬇️")
                        message.delete()
                    })

                    const id = await getID()
                    let user = bot.users.get(id)
                    const embedSuccess = new Discord.RichEmbed()
                        .setColor("GREEN")
                        .setDescription(`Hello <@${id}>, your suggestion has been approved!, It will appear in <#695559120178118666>! Thanks for suggesting that!`)

                    console.log(id)
                    user.send(embedSuccess).catch((e) => {
                        modChannel.send("I was not able to direct message the user")
                    })

                    await deleteID()

                }
                if (messageReaction.emoji.id === `699248078875787404`) {

                    msg.delete()
                    message.delete()

                    const fail = new Discord.RichEmbed()
                        .setColor("ee4747")
                        .setDescription("Your suggestion did not got approved. Sorry!")

                    const id = await getID()
                    let user = bot.users.get(id)
                    user.send(fail).catch((e) => {
                        modChannel.send("I was not able to direct message the user")
                    })

                    await deleteID()

                }
                const notbot = messageReaction.users.filter(clientuser => clientuser !== bot.user).first();
                await messageReaction.remove(notbot);
            });

        })

    }

    async function saveID(input) {
        try {
            const res = await ID.findOne({
                id: input
            })
            if (!res) {
                const newID = new ID({
                    name: "any",
                    id: input
                })
                newID.save()
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function getID() {
        try {
            const res = await ID.findOne({
                name: "any"
            })
            if (res) return res.id
        } catch (e) {
            console.log(e)
        }
    }

    async function deleteID() {
        try {
            const res = await ID.findOneAndDelete({
                name: "any"
            })
            if (!res) return;
        } catch (e) {
            console.log(e)
        }
    }

    if (!message.content.startsWith(prefix) || !isNaN(message.content.substring(1, 2)) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));

    if (cmd) {

        let cmdInfo = await getCommandInfos(cmd.help.name)

        if (!owners.includes(message.author.id) && cmdInfo[2] == true) {
            return;
        };

        if (cmdInfo[1] == false) {
            return message.channel.send("Command disabled, developer contacted")
        }

    }

    async function getCommandInfos(input) {
        try {
            const res = await Command.findOne({
                name: input
            });
            if (res) return [res.name, res.enabled, res.ownerOnly]
        } catch (e) {
            bot.logger.error(e)
        }
    }

    bot.logger.cmd(`${message.author.tag} (${message.author.id}): used ${cmd.help.name}`);
    cmd.run(bot, message, args);

    async function findOrCreateGuild(guild) {
        try {
            const res = await Guild.findOne({
                id: guild.id
            });
            if (!res) {

                const newGuild = new Guild({
                    id: guild.id,
                    prefix: "?",
                    deleteCmd: false,
                    deleteMedia: false,
                    mediaChannel: "none",
                    autoRole: false,
                    autoRoleName: "none",
                    ignoredChannels: [],
                })

                newGuild.save();
            }
            if (res) return [res.prefix, res.deleteCmd, res.deleteMedia, res.mediaChannel, res.suggestionChannel, res.suggestionID]
        } catch (e) {
            bot.logger.error(e.stack)
        };
    };

    async function createUser(input, guild, token) {
        try {
            const res = await User.findOne({
                id: input.id,
                guildId: guild.id
            })
            if (!res) {

                const newUser = new User({
                    id: input.id,
                    guildId: guild.id,
                    afk: false,
                    token: token
                })

                newUser.save()
            }
        } catch (e) {
            console.log(e)
        }
    }
};