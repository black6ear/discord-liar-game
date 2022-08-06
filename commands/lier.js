const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton }  = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('라이어게임')
        .setDescription('라이어게임'),
    async execute(interaction) {
        
        if (!interaction.member.voice.channel) {
            return interaction.reply('음성채널에 있어야합니다.')
        }

        const football = [
            "호날두", "메시", "제라드", "솔샤르", "이강인", "박지성", "캉테", "콘테", "레반도프스키", "사비 에르난데스", "이니에스타", "뎀바 바", "케인", "손흥민", 
            "벤제마", "뱅자민 멘디", "그린우드", "브루누 페르난데스", "포그바", "데헤아", "잭 그릴리쉬", "스털링", "즐라탄", "레스터 시티", "리버풀", "첼시", 
            "맨유", "레알 마드리드", "맨시티", "토트넘", "베일", "김민재", "바이에르 뮌헨", "도르트문트", "웨스트햄", "알렉산더 아놀드", "로버터슨", "반다이크", 
            "홀란드", "음바페", "키미히", "요리스", "레길론", "마운트", "루카쿠", "크라우치", "찰리 아담", "누누 산투", "리즈 유나이티드", "제이미 바디", "지루", 
            "모라타", "AC밀란", "투헬", "피를로", "에버튼", "울브스", "황희찬", "라울 히메네스", "안첼로티", "지단"
        ];
        
        const food = [
            "김밥", "새우튀김", "우동", "라면", "삼겹살", "타코야끼", "피자", "치킨", "탕수육", "짜장면", "도토리묵", "커피", "아이스크림", "제육볶음", "햄버거", "떡볶이", 
            "짬뽕", "국밥", "빙수", "순대", "밥버거"
        ];
        
        const animal = [
            "사자", "호랑이", "나무늘보", "토끼", "오리", "낙타", "악어", "기린", "올빼미", "캥거루", "코알라", "하마", "쥐", "판다", "곰", "뱀", "거북이", "강아지", 
            "고양이", "표범", "치타", "하이애나", "코뿔소", "닭", "소", "타조", "독수리", "고릴라", "원숭이", "챔팬지", "고래", "상어", "오소리", "고슴도치", "아르마딜로", 
            "너구리", "염소", "얼룩말", "말", "북극곰", "사슴", "고라니", "여우", "양", "다람쥐"
        ];
        
        const job = [
            "변호사", "의사", "모델", "작곡가", "선생님", "비서", "경호원", "영화배우", "요리사"
        ];
        

        /* 시작임베드 */
        const readyEmbed = new MessageEmbed()
            .setColor('#FFB6C1')
            .setTitle('라이어게임')
            .setDescription(`시작버튼 누르면 시작`)
            .setTimestamp()

        /* 시작후 */
        const startEmbed = new MessageEmbed()
            .setColor('#FFB6C1')
            .setTitle('라이어게임')
            .addField('주제를정하세요.', '(버튼은 10초간 유효) 규칙은 알아서', true)
            .setTimestamp()

        /* 시작버튼 */
        const ready = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('ready')
                .setLabel('시작')
                .setStyle('PRIMARY'),
            );

        /* 시작후 */
        const start = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('football')
                .setLabel('축구')
                .setStyle('SECONDARY'),
            )
        .addComponents(
            new MessageButton()
                .setCustomId('food')
                .setLabel('음식')
                .setStyle('SECONDARY'),
            )
        .addComponents(
            new MessageButton()
                .setCustomId('animal')
                .setLabel('동물')
                .setStyle('SECONDARY'),
            )
        .addComponents(
            new MessageButton()
                .setCustomId('job')
                .setLabel('직업')
                .setStyle('SECONDARY'),
            );
        

        const channel = interaction.member.voice.channel;
        const members = channel.members;
        var dd = Math.floor(Math.random() * members.size + 1);

        

        if (members.size <= 2) {
            return interaction.reply({content: "3명이상 가능"})
        }
        

            /* 축구 */
        const footballEmbed = new MessageEmbed()
            .setColor('#FFB6C1')
            .setTitle('라이어게임')
            .setDescription(`개인메세지 확인바람. 이번 주제는 __**축구**__입니다. 순서는 ${dd}번째 부터`)
            .setTimestamp()
            /* 음식 */
        const foodEmbed = new MessageEmbed()
            .setColor('#FFB6C1')
            .setTitle('라이어게임')
            .setDescription(`개인메세지 확인바람. 이번 주제는 __**음식**__입니다. 순서는 ${dd}번째 부터`)
            .setTimestamp()
            /* 사물 */
        const animalEmbed = new MessageEmbed()
            .setColor('#FFB6C1')
            .setTitle('라이어게임')
            .setDescription(`개인메세지 확인바람. 이번 주제는 __**동물**__입니다. 순서는 ${dd}번째 부터`)
            .setTimestamp()
            /* 직업 */
        const jobEmbed = new MessageEmbed()
            .setColor('#FFB6C1')
            .setTitle('라이어게임')
            .setDescription(`개인메세지 확인바람. 이번 주제는 __**직업**__입니다. 순서는 ${dd}번째 부터`)
            .setTimestamp()

        await interaction.reply({ ephemeral: false, embeds: [readyEmbed], components: [ready], fetchReply: true });

        const filter = i => i.customId === 'ready' && i.user.id === interaction.user.id;

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 5000 });

        collector.on('collect', async i => {
            if (i.customId === 'ready') {
                await i.update({ embeds: [startEmbed], components: [start] });
            }
        });

        const fbfilter = i => i.customId === 'football' && i.user.id === interaction.user.id;

        const fbcollector = interaction.channel.createMessageComponentCollector({ fbfilter, time: 10000 });

        fbcollector.on('collect', async i => {
            if (i.customId === 'football') {
                await i.update({ embeds: [footballEmbed], components: [] });

                function randomValueFromArray(array) {
                    const random = Math.floor(Math.random() * array.length);
                    return array[random];
                  }
                  
                  let fb = randomValueFromArray(football);

                  const channel = interaction.member.voice.channel;
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
          
                  arr[0].name.send({content: "당신은 라이어 입니다. 이번 주제는 __**축구**__입니다."}).catch((e) => {
                    interaction.channel.send('설정에서 서버 멤버가 보내는 다이렉트 메시지 허용하기를 켜주세요', e);
                }) 
                  
                  arr.splice(0,1)
          
                  arr.forEach(member => {
                      member.name.send({content: `이번 제시어는 ${fb} 입니다.`}).catch((e) => {
                        interaction.channel.send('설정에서 서버 멤버가 보내는 다이렉트 메시지 허용하기를 켜주세요', e);
                    }) 
                  }); 
            }
        });
        
        const fdfilter = i => i.customId === 'food' && i.user.id === interaction.user.id;

        const fdcollector = interaction.channel.createMessageComponentCollector({ fdfilter, time: 10000 });

        fdcollector.on('collect', async i => {
            if (i.customId === 'food') {
                await i.update({ embeds: [foodEmbed], components: [] });

                function randomValueFromArray(array) {
                    const random = Math.floor(Math.random() * array.length);
                    return array[random];
                  }
                  
                  let fd = randomValueFromArray(food);
                  
                  const channel = interaction.member.voice.channel;
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
          
                  arr[0].name.send({content: "당신은 라이어 입니다. 이번 주제는 __**음식**__입니다."}).catch((e) => {
                    interaction.channel.send('설정에서 서버 멤버가 보내는 다이렉트 메시지 허용하기를 켜주세요', e);
                }) 
                  
                  arr.splice(0,1)
          
                  arr.forEach(member => {
                      member.name.send({content: `이번 제시어는 ${fd} 입니다.`}).catch((e) => {
                        interaction.channel.send('설정에서 서버 멤버가 보내는 다이렉트 메시지 허용하기를 켜주세요', e);
                    }) 
                  }); 
            }
        });

        const afilter = i => i.customId === 'animal' && i.user.id === interaction.user.id;

        const acollector = interaction.channel.createMessageComponentCollector({ afilter, time: 10000 });

        acollector.on('collect', async i => {
            if (i.customId === 'animal') {
                await i.update({ embeds: [animalEmbed], components: [] });

                function randomValueFromArray(array) {
                    const random = Math.floor(Math.random() * array.length);
                    return array[random];
                  }
                  
                  let ani = randomValueFromArray(animal);

                  const channel = interaction.member.voice.channel;
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
          
                  arr[0].name.send({content: "당신은 라이어 입니다. 이번 주제는 __**동물**__입니다."}).catch((e) => {
                    interaction.channel.send('설정에서 서버 멤버가 보내는 다이렉트 메시지 허용하기를 켜주세요', e);
                }) 
                  
                  arr.splice(0,1)
          
                  arr.forEach(member => {
                      member.name.send({content: `이번 제시어는 ${ani} 입니다.`}).catch((e) => {
                        interaction.channel.send('설정에서 서버 멤버가 보내는 다이렉트 메시지 허용하기를 켜주세요', e);
                    }) 
                  }); 
            }
        });

        const jfilter = i => i.customId === 'job' && i.user.id === interaction.user.id;

        const jcollector = interaction.channel.createMessageComponentCollector({ jfilter, time: 10000 });

        jcollector.on('collect', async i => {
            if (i.customId === 'job') {
                await i.update({ embeds: [jobEmbed], components: [] });

                function randomValueFromArray(array) {
                    const random = Math.floor(Math.random() * array.length);
                    return array[random];
                  }
                  
                  let job = randomValueFromArray(job);

                  const channel = interaction.member.voice.channel;
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
          
                  arr[0].name.send({content: "당신은 라이어 입니다. 이번 주제는 __**직업**__입니다."}).catch((e) => {
                    interaction.channel.send('설정에서 서버 멤버가 보내는 다이렉트 메시지 허용하기를 켜주세요', e);
                }) 
                  
                  arr.splice(0,1)
          
                  arr.forEach(member => {
                      member.name.send({content: `이번 제시어는 ${job} 입니다.`}).catch((e) => {
                        interaction.channel.send('설정에서 서버 멤버가 보내는 다이렉트 메시지 허용하기를 켜주세요', e);
                    }) 
                  }); 
            }
        });

        

    },
};
