const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('유튜브')
		.setDescription('유튜브 투게더'),
	async execute(interaction) {
        if(interaction.member.voice.channel) {
            interaction.client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube').then(async invite => {
                return interaction.reply(`${invite.code}`);
            });
        }
        else return interaction.reply('음성채널에 있어야합니다.')
	},
};	
