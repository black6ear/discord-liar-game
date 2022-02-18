const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = 'OTI1Njc3NTc3MjQ1NDU0MzU2.YcwmbA.9pEi4h4ZHBSNE20ZJSpqKFGCOYA';
const clientId = '925677577245454356';
const guildId = '880826396887355433';
    
const rest = new REST({ version: '9' }).setToken(token);
rest.get(Routes.applicationGuildCommands(clientId, guildId))
    .then(data => {
        const promises = [];
        for (const command of data) {
            const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
    });
