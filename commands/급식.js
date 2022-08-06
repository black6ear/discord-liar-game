const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton }  = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('급식')
		.setDescription('급식')
        .addStringOption(option => option.setName('학교').setDescription('학교이름만 입력시 당일 급식이 나옴').setRequired(true))
        .addIntegerOption(option => option.setName('일').setDescription('몇일인지 입력시 그달의 입력한 날짜의 급식이 나옴').setRequired(false))
        .addIntegerOption(option => option.setName('월').setDescription('달을 입력하려면 일과 같이 적어야함').setRequired(false)),
	async execute(interaction) {
        
        var sc_name = interaction.options.getString('학교');
        var day = interaction.options.getInteger('일');
        var month = interaction.options.getInteger('월');

        var key = 'ca34186501e643209fdcea0dc9dc2264';
        // 특수문자 변수
        var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

        // 날짜 변수
        var date = new Date();

        var y = date.getFullYear();

        var d = date.getDate()
        var m = date.getMonth()

        if (d < 10) {
            var d = '0' + String(d);
        } else {
            var d = String(d);
        }

        if (date.getMonth() + 1 < 10) {
            var m = '0' + String(m + 1);
        } else {
            var m = String(m + 1);
        }

        var YMD = String(y) + String(m) + String(d);
        var YM = String(y) + String(m);


		if (interaction.client.cooldowns.has(interaction.user.id)) {
			// cooldown not ended
			interaction.reply({ content: "쿨타임 10초", ephemeral: true });
		  } else {
            //학교이름 한글 인코딩
            var sn = encodeURI(sc_name);


            if (!day && !month) {
            
            //학교정보 request
            var info_url = `https://open.neis.go.kr/hub/schoolInfo?KEY=${key}&Type=json&SCHUL_NM=${sn}`;

                const request = require('request');
                request(info_url, (err, res, body) => {
    
                    var json = JSON.parse(body);
    
                    if (json.RESULT) {
                        var errorEmbed = new MessageEmbed()
                        .setTitle(`**${sc_name}** 학교 검색 결과`)
                        .setColor('#0099ff')
                        .setTimestamp()
                        .addFields(
                            {name: json.RESULT.CODE, value: '**`' + json.RESULT.MESSAGE + '`**'},
                        )
                        .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                        
                        return interaction.reply({ embeds: [errorEmbed], components: [] });
                    }
                    
                    var select = new MessageEmbed()
                        .setColor('#FFB6C1')
                        .setTitle(`**${sc_name}** 학교 검색 결과`)
                        .setTimestamp()
                
                    var select_button1 = new MessageActionRow()
                    var select_button2 = new MessageActionRow()
                    var select_button3 = new MessageActionRow()
                    var select_button4 = new MessageActionRow()
    
                    if (json.schoolInfo[1].row.length > 1) {
                        if (json.schoolInfo[1].row.length <= 5) {
                            for(var i = 0; i < json.schoolInfo[1].row.length; i++) {
    
                                select.addFields(i+1 + ". " + json.schoolInfo[1].row[i].SCHUL_NM, json.schoolInfo[1].row[i].ORG_RDNMA, true)
        
                            }
                            for(var i = 0; i < json.schoolInfo[1].row.length; i++) {
                                
                                select_button1.addComponents(
                                    new MessageButton()
                                        .setCustomId(String(i))
                                        .setLabel(i+1 + '. ' + json.schoolInfo[1].row[i].SCHUL_NM)
                                        .setStyle('PRIMARY'),
                                    );
        
                            }
                            interaction.reply({ ephemeral: false, embeds: [select], components: [select_button1], fetchReply: true });
                        }
                        else if (json.schoolInfo[1].row.length > 5 && json.schoolInfo[1].row.length <= 10) {
                            for(var i = 0; i < json.schoolInfo[1].row.length; i++) {
    
                                select.addFields(i+1 + ". " + json.schoolInfo[1].row[i].SCHUL_NM, json.schoolInfo[1].row[i].ORG_RDNMA, true)
        
                            }
                            for(var i = 0; i < 5; i++) {
                                
                                select_button1.addComponents(
                                    new MessageButton()
                                        .setCustomId(String(i))
                                        .setLabel(i+1 + '. ' + json.schoolInfo[1].row[i].SCHUL_NM)
                                        .setStyle('PRIMARY'),
                                    );
        
                            }
                            for(var i = 5; i < json.schoolInfo[1].row.length; i++) {
                                
                                select_button2.addComponents(
                                    new MessageButton()
                                        .setCustomId(String(i))
                                        .setLabel(i+1 + '. ' + json.schoolInfo[1].row[i].SCHUL_NM)
                                        .setStyle('PRIMARY'),
                                    );
        
                            }
                            interaction.reply({ ephemeral: false, embeds: [select], components: [select_button1, select_button2], fetchReply: true });
                        }
                        else if (json.schoolInfo[1].row.length > 10 && json.schoolInfo[1].row.length <= 15) {
                            for(var i = 0; i < json.schoolInfo[1].row.length; i++) {
    
                                select.addFields(i+1 + ". " + json.schoolInfo[1].row[i].SCHUL_NM, json.schoolInfo[1].row[i].ORG_RDNMA, true)
                                
                            }
                            
                            for(var i = 0; i < 5; i++) {
                                
                                select_button1.addComponents(
                                    new MessageButton()
                                        .setCustomId(String(i))
                                        .setLabel(i+1 + '. ' + json.schoolInfo[1].row[i].SCHUL_NM)
                                        .setStyle('PRIMARY'),
                                    );
        
                            }
                            for(var i = 5; i < 10; i++) {
                                
                                select_button2.addComponents(
                                    new MessageButton()
                                        .setCustomId(String(i))
                                        .setLabel(i+1 + '. ' + json.schoolInfo[1].row[i].SCHUL_NM)
                                        .setStyle('PRIMARY'),
                                    );
        
                            }
                            for(var i = 10; i < json.schoolInfo[1].row.length; i++) {
                                
                                select_button3.addComponents(
                                    new MessageButton()
                                        .setCustomId(String(i))
                                        .setLabel(i+1 + '. ' + json.schoolInfo[1].row[i].SCHUL_NM)
                                        .setStyle('PRIMARY'),
                                    );
        
                            }
                            interaction.reply({ ephemeral: false, embeds: [select], components: [select_button1, select_button2, select_button3], fetchReply: true });
                        }
    
                        const filter = i => (i.customId === '0' || i.customId === '1' || i.customId === '2' || i.customId === '3' || i.customId === '4' || 
                        i.customId === '5' || i.customId === '6' || i.customId === '7' || i.customId === '8' || i.customId === '9' || 
                        i.customId === '10' || i.customId === '11' || i.customId === '12' || i.customId === '13' || i.customId === '14') && i.user.id === interaction.user.id;
                
                        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });
                
                        collector.on('collect', async i => {
                            for (var j = 0; j < json.schoolInfo[1].row.length; j++) {
                                if (i.customId === String(j)) {
                                    var SC_CODE = json.schoolInfo[1].row[j].ATPT_OFCDC_SC_CODE
                                    var SCHUL_CODE = json.schoolInfo[1].row[j].SD_SCHUL_CODE
                                    var SC_ADD = json.schoolInfo[1].row[j].ORG_RDNMA
                                    var SC_NM = json.schoolInfo[1].row[j].SCHUL_NM
        
                                    const meal_url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${key}&Type=json&ATPT_OFCDC_SC_CODE=${SC_CODE}&SD_SCHUL_CODE=${SCHUL_CODE}&MLSV_YMD=${YMD}`;
                                    console.log(meal_url);
                                    request(meal_url, async (err, res, body) => {
                                        var json = JSON.parse(body);
    
                                        if (json.RESULT) {
                                            var errorEmbed = new MessageEmbed()
                                            .setTitle(`${SC_NM}`)
                                            .setDescription(`${y}년 ${m}월 ${d}일`)
                                            .setColor('#0099ff')
                                            .setTimestamp()
                                            .addFields(
                                                {name: json.RESULT.CODE, value: '**`' + json.RESULT.MESSAGE + '`**'},
                                                {name: '학교주소', value: '`' + SC_ADD + '`'},
                                            )
                                            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                                            
                                            return i.update({ embeds: [errorEmbed], components: [] });
                                        }
                                        else {
                                            
                                            var diet = json.mealServiceDietInfo[1].row[0].DDISH_NM;
                                            var dtype = json.mealServiceDietInfo[1].row[0].MMEAL_SC_NM;
                                            
                        
                                            var diet_result = diet.replace(/<br\s*[\/]?>/gi, '\n').replace(reg,'').replace(/[(0-9)]/g,'').replace(/[a-z]/gi,'').replace(/ /g, '');
            
                                            var dietEmbed = new MessageEmbed()
                                            .setTitle(`${SC_NM}`)
                                            .setDescription(`${y}년 ${m}월 ${d}일`)
                                            .setColor('#0099ff')
                                            .setTimestamp()
                                            .addFields(
                                                {name: dtype, value: '**`' + diet_result + '`**'},
                                                {name: '학교주소', value: '`' + SC_ADD + '`'},
                                            )
                                            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                                            
                                            return i.update({ embeds: [dietEmbed], components: [] });
                                        }
    
        
                                    })
                            }
                            }
                            
                    });
    
                } else {
                    
                    var SC_CODE = json.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE
                    var SCHUL_CODE = json.schoolInfo[1].row[0].SD_SCHUL_CODE
                    var SC_ADD = json.schoolInfo[1].row[0].ORG_RDNMA
                    var SC_NM = json.schoolInfo[1].row[0].SCHUL_NM
    
    
                    // 급식식단정보 request
                    const meal_url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${key}&Type=json&ATPT_OFCDC_SC_CODE=${SC_CODE}&SD_SCHUL_CODE=${SCHUL_CODE}&MLSV_YMD=${YMD}`;
                    request(meal_url, (err, res, body) => {
    
                        var json = JSON.parse(body);
    
                        if (json.RESULT) {
                            var errorEmbed = new MessageEmbed()
                            .setTitle(`${SC_NM}`)
                            .setDescription(`${y}년 ${m}월 ${d}일`)
                            .setColor('#0099ff')
                            .setTimestamp()
                            .addFields(
                                {name: json.RESULT.CODE, value: '**`' + json.RESULT.MESSAGE + '`**'},
                                {name: '학교주소', value: '`' + SC_ADD + '`'},
                            )
                            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                            
                            return interaction.reply({ embeds: [errorEmbed], components: [] });
                        }
                        else {
                            var diet = json.mealServiceDietInfo[1].row[0].DDISH_NM;
                            var dtype = json.mealServiceDietInfo[1].row[0].MMEAL_SC_NM;
        
                            var diet_result = diet.replace(/<br\s*[\/]?>/gi, '\n').replace(reg,'').replace(/[(0-9)]/g,'').replace(/[a-z]/gi,'').replace(/ /g, '');
        
                            var dietEmbed = new MessageEmbed()
                            .setTitle(`${SC_NM}`)
                            .setDescription(`${y}년 ${m}월 ${d}일`)
                            .setColor('#0099ff')
                            .setTimestamp()
                            .addFields(
                                {name: dtype, value: '**`' + diet_result + '`**'},
                                {name: '학교주소', value: '`' + SC_ADD + '`'},
                            )
                            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                            
                            return interaction.reply({ embeds: [dietEmbed], components: [] });
                        }
                        
                    })
                }
                    
    
                });
            }
            else if (day < 33 && day > 0 && !month) {
                
                if (day < 10) {
                    day = '0' + String(day);
                }
                            
            //학교정보 request
            var info_url = `https://open.neis.go.kr/hub/schoolInfo?KEY=${key}&Type=json&SCHUL_NM=${sn}`;

            const request = require('request');
            request(info_url, (err, res, body) => {

                var json = JSON.parse(body);

                if (json.RESULT) {
                    var errorEmbed = new MessageEmbed()
                    .setTitle(`**${sc_name}** 학교 검색 결과`)
                    .setColor('#0099ff')
                    .setTimestamp()
                    .addFields(
                        {name: json.RESULT.CODE, value: '**`' + json.RESULT.MESSAGE + '`**'},
                    )
                    .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                    
                    return interaction.reply({ embeds: [errorEmbed], components: [] });
                }
                
                var select = new MessageEmbed()
                    .setColor('#FFB6C1')
                    .setTitle(`**${sc_name}** 학교 검색 결과`)
                    .setTimestamp()
            
                var select_button1 = new MessageActionRow()
                var select_button2 = new MessageActionRow()
                var select_button3 = new MessageActionRow()
                var select_button4 = new MessageActionRow()

                if (json.schoolInfo[1].row.length > 1) {
                    if (json.schoolInfo[1].row.length <= 5) {
                        for(var i = 0; i < json.schoolInfo[1].row.length; i++) {

                            select.addFields(i+1 + ". " + json.schoolInfo[1].row[i].SCHUL_NM, json.schoolInfo[1].row[i].ORG_RDNMA, true)
    
                        }
                        for(var i = 0; i < json.schoolInfo[1].row.length; i++) {
                            
                            select_button1.addComponents(
                                new MessageButton()
                                    .setCustomId(String(i))
                                    .setLabel(i+1 + '. ' + json.schoolInfo[1].row[i].SCHUL_NM)
                                    .setStyle('PRIMARY'),
                                );
    
                        }
                        interaction.reply({ ephemeral: false, embeds: [select], components: [select_button1], fetchReply: true });
                    }
                    else if (json.schoolInfo[1].row.length > 5 && json.schoolInfo[1].row.length <= 10) {
                        for(var i = 0; i < json.schoolInfo[1].row.length; i++) {

                            select.addFields(i+1 + ". " + json.schoolInfo[1].row[i].SCHUL_NM, json.schoolInfo[1].row[i].ORG_RDNMA, true)
    
                        }
                        for(var i = 0; i < 5; i++) {
                            
                            select_button1.addComponents(
                                new MessageButton()
                                    .setCustomId(String(i))
                                    .setLabel(i+1 + '. ' + json.schoolInfo[1].row[i].SCHUL_NM)
                                    .setStyle('PRIMARY'),
                                );
    
                        }
                        for(var i = 5; i < json.schoolInfo[1].row.length; i++) {
                            
                            select_button2.addComponents(
                                new MessageButton()
                                    .setCustomId(String(i))
                                    .setLabel(i+1 + '. ' + json.schoolInfo[1].row[i].SCHUL_NM)
                                    .setStyle('PRIMARY'),
                                );
    
                        }
                        interaction.reply({ ephemeral: false, embeds: [select], components: [select_button1, select_button2], fetchReply: true });
                    }
                    else if (json.schoolInfo[1].row.length > 10 && json.schoolInfo[1].row.length <= 15) {
                        for(var i = 0; i < json.schoolInfo[1].row.length; i++) {

                            select.addFields(i+1 + ". " + json.schoolInfo[1].row[i].SCHUL_NM, json.schoolInfo[1].row[i].ORG_RDNMA, true)
                            
                        }
                        
                        for(var i = 0; i < 5; i++) {
                            
                            select_button1.addComponents(
                                new MessageButton()
                                    .setCustomId(String(i))
                                    .setLabel(i+1 + '. ' + json.schoolInfo[1].row[i].SCHUL_NM)
                                    .setStyle('PRIMARY'),
                                );
    
                        }
                        for(var i = 5; i < 10; i++) {
                            
                            select_button2.addComponents(
                                new MessageButton()
                                    .setCustomId(String(i))
                                    .setLabel(i+1 + '. ' + json.schoolInfo[1].row[i].SCHUL_NM)
                                    .setStyle('PRIMARY'),
                                );
    
                        }
                        for(var i = 10; i < json.schoolInfo[1].row.length; i++) {
                            
                            select_button3.addComponents(
                                new MessageButton()
                                    .setCustomId(String(i))
                                    .setLabel(i+1 + '. ' + json.schoolInfo[1].row[i].SCHUL_NM)
                                    .setStyle('PRIMARY'),
                                );
    
                        }
                        interaction.reply({ ephemeral: false, embeds: [select], components: [select_button1, select_button2, select_button3], fetchReply: true });
                    }

                    const filter = i => (i.customId === '0' || i.customId === '1' || i.customId === '2' || i.customId === '3' || i.customId === '4' || 
                    i.customId === '5' || i.customId === '6' || i.customId === '7' || i.customId === '8' || i.customId === '9' || 
                    i.customId === '10' || i.customId === '11' || i.customId === '12' || i.customId === '13' || i.customId === '14') && i.user.id === interaction.user.id;
            
                    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });
            
                    collector.on('collect', async i => {
                        for (var j = 0; j < json.schoolInfo[1].row.length; j++) {
                            if (i.customId === String(j)) {
                                var SC_CODE = json.schoolInfo[1].row[j].ATPT_OFCDC_SC_CODE
                                var SCHUL_CODE = json.schoolInfo[1].row[j].SD_SCHUL_CODE
                                var SC_ADD = json.schoolInfo[1].row[j].ORG_RDNMA
                                var SC_NM = json.schoolInfo[1].row[j].SCHUL_NM
    
                                const meal_url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${key}&Type=json&ATPT_OFCDC_SC_CODE=${SC_CODE}&SD_SCHUL_CODE=${SCHUL_CODE}&MLSV_YMD=${YM}${day}`;
                                console.log(meal_url);
                                request(meal_url, async (err, res, body) => {
                                    var json = JSON.parse(body);

                                    if (json.RESULT) {
                                        var errorEmbed = new MessageEmbed()
                                        .setTitle(`${SC_NM}`)
                                        .setDescription(`${y}년 ${m}월 ${day}일`)
                                        .setColor('#0099ff')
                                        .setTimestamp()
                                        .addFields(
                                            {name: json.RESULT.CODE, value: '**`' + json.RESULT.MESSAGE + '`**'},
                                            {name: '학교주소', value: '`' + SC_ADD + '`'},
                                        )
                                        .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                                        
                                        return i.update({ embeds: [errorEmbed], components: [] });
                                    }
                                    else {
                                        
                                        var diet = json.mealServiceDietInfo[1].row[0].DDISH_NM;
                                        var dtype = json.mealServiceDietInfo[1].row[0].MMEAL_SC_NM;
                                        
                    
                                        var diet_result = diet.replace(/<br\s*[\/]?>/gi, '\n').replace(reg,'').replace(/[(0-9)]/g,'').replace(/[a-z]/gi,'').replace(/ /g, '');
        
                                        var dietEmbed = new MessageEmbed()
                                        .setTitle(`${SC_NM}`)
                                        .setDescription(`${y}년 ${m}월 ${day}일`)
                                        .setColor('#0099ff')
                                        .setTimestamp()
                                        .addFields(
                                            {name: dtype, value: '**`' + diet_result + '`**'},
                                            {name: '학교주소', value: '`' + SC_ADD + '`'},
                                        )
                                        .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                                        
                                        return i.update({ embeds: [dietEmbed], components: [] });
                                    }

    
                                })
                        }
                        }
                        
                });

            } else {
                
                var SC_CODE = json.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE
                var SCHUL_CODE = json.schoolInfo[1].row[0].SD_SCHUL_CODE
                var SC_ADD = json.schoolInfo[1].row[0].ORG_RDNMA
                var SC_NM = json.schoolInfo[1].row[0].SCHUL_NM


                // 급식식단정보 request
                const meal_url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${key}&Type=json&ATPT_OFCDC_SC_CODE=${SC_CODE}&SD_SCHUL_CODE=${SCHUL_CODE}&MLSV_YMD=${YM}${day}`;
                request(meal_url, (err, res, body) => {

                    var json = JSON.parse(body);

                    if (json.RESULT) {
                        var errorEmbed = new MessageEmbed()
                        .setTitle(`${SC_NM}`)
                        .setDescription(`${y}년 ${m}월 ${day}일`)
                        .setColor('#0099ff')
                        .setTimestamp()
                        .addFields(
                            {name: json.RESULT.CODE, value: '**`' + json.RESULT.MESSAGE + '`**'},
                            {name: '학교주소', value: '`' + SC_ADD + '`'},
                        )
                        .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                        
                        return interaction.reply({ embeds: [errorEmbed], components: [] });
                    }
                    else {
                        var diet = json.mealServiceDietInfo[1].row[0].DDISH_NM;
                        var dtype = json.mealServiceDietInfo[1].row[0].MMEAL_SC_NM;
    
                        var diet_result = diet.replace(/<br\s*[\/]?>/gi, '\n').replace(reg,'').replace(/[(0-9)]/g,'').replace(/[a-z]/gi,'').replace(/ /g, '');
    
                        var dietEmbed = new MessageEmbed()
                        .setTitle(`${SC_NM}`)
                        .setDescription(`${y}년 ${m}월 ${day}일`)
                        .setColor('#0099ff')
                        .setTimestamp()
                        .addFields(
                            {name: dtype, value: '**`' + diet_result + '`**'},
                            {name: '학교주소', value: '`' + SC_ADD + '`'},
                        )
                        .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                        
                        return interaction.reply({ embeds: [dietEmbed], components: [] });
                    }
                    
                })
            }
                

            });
            }
            else if (month > 0 && month < 13 && day < 33 && day > 0) {

                if (day < 10) {
                    var day = '0' + String(day);
                }
        
                if (month < 10) {
                    var month = '0' + String(month);
                }
                            
            //학교정보 request
            var info_url = `https://open.neis.go.kr/hub/schoolInfo?KEY=${key}&Type=json&SCHUL_NM=${sn}`;

            const request = require('request');
            request(info_url, (err, res, body) => {

                var json = JSON.parse(body);

                if (json.RESULT) {
                    var errorEmbed = new MessageEmbed()
                    .setTitle(`**${sc_name}** 학교 검색 결과`)
                    .setColor('#0099ff')
                    .setTimestamp()
                    .addFields(
                        {name: json.RESULT.CODE, value: '**`' + json.RESULT.MESSAGE + '`**'},
                    )
                    .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                    
                    return interaction.reply({ embeds: [errorEmbed], components: [] });
                }
                
                var select = new MessageEmbed()
                    .setColor('#FFB6C1')
                    .setTitle(`**${sc_name}** 학교 검색 결과`)
                    .setTimestamp()
            
                var select_button1 = new MessageActionRow()
                var select_button2 = new MessageActionRow()
                var select_button3 = new MessageActionRow()
                var select_button4 = new MessageActionRow()

                if (json.schoolInfo[1].row.length > 1) {
                    if (json.schoolInfo[1].row.length <= 5) {
                        for(var i = 0; i < json.schoolInfo[1].row.length; i++) {

                            select.addFields(i+1 + ". " + json.schoolInfo[1].row[i].SCHUL_NM, json.schoolInfo[1].row[i].ORG_RDNMA, true)
    
                        }
                        for(var i = 0; i < json.schoolInfo[1].row.length; i++) {
                            
                            select_button1.addComponents(
                                new MessageButton()
                                    .setCustomId(String(i))
                                    .setLabel(i+1 + '. ' + json.schoolInfo[1].row[i].SCHUL_NM)
                                    .setStyle('PRIMARY'),
                                );
    
                        }
                        interaction.reply({ ephemeral: false, embeds: [select], components: [select_button1], fetchReply: true });
                    }
                    else if (json.schoolInfo[1].row.length > 5 && json.schoolInfo[1].row.length <= 10) {
                        for(var i = 0; i < json.schoolInfo[1].row.length; i++) {

                            select.addFields(i+1 + ". " + json.schoolInfo[1].row[i].SCHUL_NM, json.schoolInfo[1].row[i].ORG_RDNMA, true)
    
                        }
                        for(var i = 0; i < 5; i++) {
                            
                            select_button1.addComponents(
                                new MessageButton()
                                    .setCustomId(String(i))
                                    .setLabel(i+1 + '. ' + json.schoolInfo[1].row[i].SCHUL_NM)
                                    .setStyle('PRIMARY'),
                                );
    
                        }
                        for(var i = 5; i < json.schoolInfo[1].row.length; i++) {
                            
                            select_button2.addComponents(
                                new MessageButton()
                                    .setCustomId(String(i))
                                    .setLabel(i+1 + '. ' + json.schoolInfo[1].row[i].SCHUL_NM)
                                    .setStyle('PRIMARY'),
                                );
    
                        }
                        interaction.reply({ ephemeral: false, embeds: [select], components: [select_button1, select_button2], fetchReply: true });
                    }
                    else if (json.schoolInfo[1].row.length > 10 && json.schoolInfo[1].row.length <= 15) {
                        for(var i = 0; i < json.schoolInfo[1].row.length; i++) {

                            select.addFields(i+1 + ". " + json.schoolInfo[1].row[i].SCHUL_NM, json.schoolInfo[1].row[i].ORG_RDNMA, true)
                            
                        }
                        
                        for(var i = 0; i < 5; i++) {
                            
                            select_button1.addComponents(
                                new MessageButton()
                                    .setCustomId(String(i))
                                    .setLabel(i+1 + '. ' + json.schoolInfo[1].row[i].SCHUL_NM)
                                    .setStyle('PRIMARY'),
                                );
    
                        }
                        for(var i = 5; i < 10; i++) {
                            
                            select_button2.addComponents(
                                new MessageButton()
                                    .setCustomId(String(i))
                                    .setLabel(i+1 + '. ' + json.schoolInfo[1].row[i].SCHUL_NM)
                                    .setStyle('PRIMARY'),
                                );
    
                        }
                        for(var i = 10; i < json.schoolInfo[1].row.length; i++) {
                            
                            select_button3.addComponents(
                                new MessageButton()
                                    .setCustomId(String(i))
                                    .setLabel(i+1 + '. ' + json.schoolInfo[1].row[i].SCHUL_NM)
                                    .setStyle('PRIMARY'),
                                );
    
                        }
                        interaction.reply({ ephemeral: false, embeds: [select], components: [select_button1, select_button2, select_button3], fetchReply: true });
                    }

                    const filter = i => (i.customId === '0' || i.customId === '1' || i.customId === '2' || i.customId === '3' || i.customId === '4' || 
                    i.customId === '5' || i.customId === '6' || i.customId === '7' || i.customId === '8' || i.customId === '9' || 
                    i.customId === '10' || i.customId === '11' || i.customId === '12' || i.customId === '13' || i.customId === '14') && i.user.id === interaction.user.id;
            
                    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });
            
                    collector.on('collect', async i => {
                        for (var j = 0; j < json.schoolInfo[1].row.length; j++) {
                            if (i.customId === String(j)) {
                                var SC_CODE = json.schoolInfo[1].row[j].ATPT_OFCDC_SC_CODE
                                var SCHUL_CODE = json.schoolInfo[1].row[j].SD_SCHUL_CODE
                                var SC_ADD = json.schoolInfo[1].row[j].ORG_RDNMA
                                var SC_NM = json.schoolInfo[1].row[j].SCHUL_NM
    
                                const meal_url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${key}&Type=json&ATPT_OFCDC_SC_CODE=${SC_CODE}&SD_SCHUL_CODE=${SCHUL_CODE}&MLSV_YMD=${y}${month}${day}`;
                                console.log(meal_url);
                                request(meal_url, async (err, res, body) => {
                                    var json = JSON.parse(body);

                                    if (json.RESULT) {
                                        var errorEmbed = new MessageEmbed()
                                        .setTitle(`${SC_NM}`)
                                        .setDescription(`${y}년 ${month}월 ${day}일`)
                                        .setColor('#0099ff')
                                        .setTimestamp()
                                        .addFields(
                                            {name: json.RESULT.CODE, value: '**`' + json.RESULT.MESSAGE + '`**'},
                                            {name: '학교주소', value: '`' + SC_ADD + '`'},
                                        )
                                        .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                                        
                                        return i.update({ embeds: [errorEmbed], components: [] });
                                    }
                                    else {
                                        
                                        var diet = json.mealServiceDietInfo[1].row[0].DDISH_NM;
                                        var dtype = json.mealServiceDietInfo[1].row[0].MMEAL_SC_NM;
                                        
                    
                                        var diet_result = diet.replace(/<br\s*[\/]?>/gi, '\n').replace(reg,'').replace(/[(0-9)]/g,'').replace(/[a-z]/gi,'').replace(/ /g, '');
        
                                        var dietEmbed = new MessageEmbed()
                                        .setTitle(`${SC_NM}`)
                                        .setDescription(`${y}년 ${month}월 ${day}일`)
                                        .setColor('#0099ff')
                                        .setTimestamp()
                                        .addFields(
                                            {name: dtype, value: '**`' + diet_result + '`**'},
                                            {name: '학교주소', value: '`' + SC_ADD + '`'},
                                        )
                                        .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                                        
                                        return i.update({ embeds: [dietEmbed], components: [] });
                                    }

    
                                })
                        }
                        }
                        
                });

            } else {
                
                var SC_CODE = json.schoolInfo[1].row[0].ATPT_OFCDC_SC_CODE
                var SCHUL_CODE = json.schoolInfo[1].row[0].SD_SCHUL_CODE
                var SC_ADD = json.schoolInfo[1].row[0].ORG_RDNMA
                var SC_NM = json.schoolInfo[1].row[0].SCHUL_NM


                // 급식식단정보 request
                const meal_url = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${key}&Type=json&ATPT_OFCDC_SC_CODE=${SC_CODE}&SD_SCHUL_CODE=${SCHUL_CODE}&MLSV_YMD=${y}${month}${day}`;
                request(meal_url, (err, res, body) => {

                    var json = JSON.parse(body);

                    if (json.RESULT) {
                        var errorEmbed = new MessageEmbed()
                        .setTitle(`${SC_NM}`)
                        .setDescription(`${y}년 ${month}월 ${day}일`)
                        .setColor('#0099ff')
                        .setTimestamp()
                        .addFields(
                            {name: json.RESULT.CODE, value: '**`' + json.RESULT.MESSAGE + '`**'},
                            {name: '학교주소', value: '`' + SC_ADD + '`'},
                        )
                        .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                        
                        return interaction.reply({ embeds: [errorEmbed], components: [] });
                    }
                    else {
                        var diet = json.mealServiceDietInfo[1].row[0].DDISH_NM;
                        var dtype = json.mealServiceDietInfo[1].row[0].MMEAL_SC_NM;
    
                        var diet_result = diet.replace(/<br\s*[\/]?>/gi, '\n').replace(reg,'').replace(/[(0-9)]/g,'').replace(/[a-z]/gi,'').replace(/ /g, '');

                        console.log(diet);
                        console.log(diet_result);
    
                        var dietEmbed = new MessageEmbed()
                        .setTitle(`${SC_NM}`)
                        .setDescription(`${y}년 ${month}월 ${day}일`)
                        .setColor('#0099ff')
                        .setTimestamp()
                        .addFields(
                            {name: dtype, value: '**`' + diet_result + '`**'},
                            {name: '학교주소', value: '`' + SC_ADD + '`'},
                        )
                        .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                        
                        return interaction.reply({ embeds: [dietEmbed], components: [] });
                    }
                    
                })
            }
                

            });
            }
            else if (month >0 && month < 13  && !day) return interaction.reply('몇일인지 입력해주셈')




			//now, set cooldown
			interaction.client.cooldowns.set(interaction.user.id, true);
		
			// After the time you specified, remove the cooldown
			setTimeout(() => {
                interaction.client.cooldowns.delete(interaction.user.id);
			}, interaction.client.COOLDOWN_SECONDS * 1000);
		  }
        
        
	},
};
