const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Configure the settings of this bot.'),
    async execute(interaction) {
        await interaction.reply(":thinking:");
        fs.readFile('settings.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                interaction.followUp('Failed to read settings. Please try again later.');
                return;
            }
            try {
                const settings = JSON.parse(data);
                const emoji = settings.verbose ? ':white_check_mark:' : ':x:';
                const description = 'Allow the bot to reply detailed messages of what happened instead of just emojis.'
    
                let settingsEmbed = new EmbedBuilder()
                    .setTitle(":wrench: Settings")
                    .setDescription(`${emoji} **Verbose Messages**\n${description}`);
                interaction.followUp({ embeds: [settingsEmbed] });
            } catch (error) {
                console.error(error);
                interaction.followUp('Failed to parse `settings.json`. Please contact the guild owner to fix this.');
            }
        });
    }    
};
