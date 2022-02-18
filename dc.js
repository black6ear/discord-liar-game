const { REST } = require('@discordjs/rest');
const { SlashCommandBuilder } = require('@discordjs/builders');	
const { Routes } = require('discord-api-types/v9');
const { token, guildIds, clientId } = require('./config.json');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	guildIds.map(async (guildId) =>{
		try {
			await rest.put(	
				Routes.applicationGuildCommands(clientId, guildId),
				{ body: {},}
			);
			console.log(`${guildId} 서버 성공`);
		} catch (error) {
			console.error(error);
		}
	});

	try {
		await rest.put(Routes.applicationCommand(clientId), {
			body: commands,
		});
		console.log('글로벌 명령어 등록 성공')
	}
	catch (error) {
		console.log(error);
	}
})();
