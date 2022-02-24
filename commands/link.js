const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('초대')
		.setDescription('봇 초대 링크'),
	async execute(interaction) {

		await interaction.reply('https://discord.com/api/oauth2/authorize?client_id=925677577245454356&permissions=2147616833&scope=bot%20applications.commands');
	},
};	
