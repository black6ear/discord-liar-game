const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('shardError', error => {
	console.error('A websocket connection encountered an error:', error);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on("messageCreate", message => {
	const prefix = '!';
    if (message.content.indexOf(prefix) !== 0) {return false};

    const arguments = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = arguments.shift().toLowerCase();

    if (cmd == "청소") {
        if (!arguments[0]) return message.channel.send("2와 100사이 숫자로")
        if (arguments[0] < 2 || arguments[0] > 100) return message.channel.send("2와 100사이 숫자로")

        message.channel.bulkDelete(arguments[0]).then(messages => {
            message.channel.send(`메세지 ${messages.size}개가 삭제됨`);
        }).catch(e => console.log(e));
    };
});

client.login(token);
