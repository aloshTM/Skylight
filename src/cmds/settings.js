const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

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
                interaction.followUp('Failed to read `settings.json`. Please tell the guild owner to fix this.');
                return;
            }
            try {
                const settings = JSON.parse(data);
                let settingsEmbed = new EmbedBuilder()
                    .setTitle(":wrench: Settings");
                
                for (const key in settings) {
                    if (Object.hasOwnProperty.call(settings, key)) {
                        const value = settings[key];
                        const emoji = value ? ':white_check_mark:' : ':x:';
                        const description = value ? 'Enabled' : 'Disabled';
                        settingsEmbed.addField(`${emoji} ${key}`, description);
                    }
                }
    
                interaction.followUp({ embeds: [settingsEmbed] });
            } catch (error) {
                console.error(error);
                interaction.followUp('Failed to read `settings.json`. Please tell the guild owner to fix this.');
            }
        });
    }    
};
