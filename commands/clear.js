const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('청소')
		.setDescription('청소명령어')
        .addIntegerOption(option => option.setName('청소값').setDescription('2~100까지의 정수를 써주세요.')),
	async execute(interaction) {
        const integer = interaction.options.getInteger('청소값');

        if (!integer) return interaction.reply("2와 100사이 숫자로")
        if (integer < 2 || integer > 100) return interaction.reply("2와 100사이 숫자로")

        interaction.channel.bulkDelete(integer).then(messages => {
            interaction.reply(`메세지 ${messages.size}개가 삭제됨`);
        }).catch(err => console.log(err));
	},  
};	
