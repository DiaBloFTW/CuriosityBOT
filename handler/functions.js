module.exports = (bot) => {

    bot.loadCommand = (commandName) => {
        try {
            const props = require(`../commands/${commandName}`);
            if (props.init) {
                props.init(bot);
            };
            bot.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                bot.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (e) {
            return `Unable to load command ${commandName}: \n${e}`;
        };
    };

    bot.unloadCommand = async (commandName) => {
        let command;
        if (bot.commands.has(commandName)) {
            command = bot.commands.get(commandName);
        } else if (bot.aliases.has(commandName)) {
            command = bot.commands.get(bot.aliases.get(commandName));
        };
        if (command.shutdown) {
            await command.shutdown(bot);
        }
        delete require.cache[require.resolve(`../commands/${commandName}`)];
        return false;
    };

};