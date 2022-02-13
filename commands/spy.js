const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton }  = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('스파이게임')
		.setDescription('스파이게임'),
	async execute(interaction) {

        const questions = ["얼마나 자주 모자를 쓰나요?\n1.자주 2.때때로 3.드물게"];

        const Embed = new MessageEmbed()
        .setColor('#FFB6C1')
        .setTitle('스파이게임')
        .setDescription(`시작버튼 누르면 시작`)
        .setTimestamp()

        const start = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('start')
                .setLabel('시작')
                .setStyle('PRIMARY'),
            );

        const startEmbed = new MessageEmbed()
        .setColor('#FFB6C1')
        .setTitle('스파이게임')
        .setDescription(`개인메시지 확인하세요. 15초뒤 질문이 공개됩니다.`)
        .setTimestamp()

        await interaction.reply({ ephemeral: false, embeds: [Embed], components: [start], fetchReply: true });

        const filter = i => i.customId === 'start';

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 7000 });

        collector.on('collect', async i => {
            if (i.customId === 'start') {
                await i.update({ embeds: [startEmbed], components: [] });

                function randomValueFromArray(array) {
                    const random = Math.floor(Math.random() * array.length);
                    return array[random];
                  }
                  
                  let quest = randomValueFromArray(questions);

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
          
                //   console.log(sortResult);
          
                  const arr = [];
          
                  sortResult.forEach(member2 => {
                      if (member2.name.user.id != interaction.client.user.id && !member2.name.user.bot) {
          
                        //   console.log(member2);
          
                          arr.push(member2)
                      }
                  })
                //   console.log(arr)
          
                  arr[0].name.send({content: "당신은 스파이 입니다. 질문을 예상하고 답변을 누르세요."})
                  
                  arr.splice(0,1)
          
                  arr.forEach(member => {
                      member.name.send({content: quest});
                  }); 
            }
        });

	},
};