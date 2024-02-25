const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('node:path')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Configure the settings of this bot.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction) {
        await interaction.reply(":thinking:");

        const settingsPath = path.join(__dirname, '..', 'settings.json');

        fs.readFile(settingsPath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                interaction.followUp('Failed to parse `settings.json`. Please contact the guild owner to fix this.');
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
