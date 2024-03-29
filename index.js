const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_VOICE_STATES ] });
const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);

client.on('messageCreate', async message => { // 'message' for Discord.js v12
    if (message.content === ';포커') {
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'poker').then(async invite => {
                return message.channel.send(`${invite.code}`);
            });
        };
    };
});

client.on('messageCreate', async message => { // 'message' for Discord.js v12
    if (message.content === ';체스') {
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'chess').then(async invite => {
                return message.channel.send(`${invite.code}`);
            });
        };
    };
});

//쿨타임
client.cooldowns = new Collection();
client.COOLDOWN_SECONDS = 2;

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setStatus("online");
  client.user.setActivity(`ㅎㅇ`, {
    type: "PLAYING",
    url: "https://www.twitch.tv/wookwakgood"
  });
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


client.login(token);
