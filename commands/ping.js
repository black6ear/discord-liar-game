const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed }  = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const ping = Date.now() - interaction.createdTimestamp;
		const APIping = Math.round(interaction.client.ws.ping);

		const embed = new MessageEmbed()
			.setColor('#FFB6C1')
			.setTitle('Pong!')
			.setDescription(
				'지연시간 `' +`${ping}` + ' ms`\n' +
				'API지연시간 `' + `${APIping}` + 'ms`')
			.setTimestamp()

		await interaction.reply({ ephemeral: false, embeds: [embed] })
	},
};	
