const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('test'),
	async execute(interaction) {
		await interaction.reply('test');

        const channel = interaction.channel;
        const members = channel.members;

        //모든 유저에게 키값 랜덤 부여
        const generateRandomKey = () => Math.floor(Math.random() * 1000);
    
        const membersWithKey = members.map(member1 => ({
            name: member1,
            key: generateRandomKey(),
        }));

        const sortResult = membersWithKey.sort((a, b) => {
            return a.key >= b.key ? 1 : -1;
        });

        console.log(sortResult);

        const arr = [];

        sortResult.forEach(member2 => {
            if (member2.name.user.id != interaction.client.user.id && !member2.name.user.bot) {

                console.log(member2);

                arr.push(member2)
            }
        })
        console.log(arr)

        arr[0].name.send({content: "라이어"})
        
        arr.splice(0,1)

        arr.forEach(member => {
            member.name.send({content: "시민"});
        }); 

	},
};