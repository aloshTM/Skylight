const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, PermissionFlagsBits, ButtonStyle, Embed } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { getSettingName } = require('../modules/settings-name');
const { getSettingDescription } = require('../modules/settings-description');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Configure the settings of this bot.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    async execute(interaction) {
        await interaction.deferReply(); 

        const settingsPath = path.join(__dirname, '..', 'settings.json');

        const configure = new ButtonBuilder()
            .setCustomId("configure")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("⚙️");

        const buttonRow = new ActionRowBuilder()
            .addComponents(configure);    

        fs.readFile(settingsPath, 'utf8', async (err, data) => { 
            if (err) {
                console.error(err);
                await interaction.followUp('Failed to read `settings.json`. Please tell the guild owner to fix this.');
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
                        const name = getSettingName(key);
                        const description = getSettingDescription(key);
                        settingsEmbed.addFields({ name: `${emoji} ${name}`, value: `${description}\n` });
                    }
                }

                const message = await interaction.followUp({ embeds: [settingsEmbed], components: [buttonRow] });

                const filter = (i) => i.user.id === interaction.user.id;

                const collector = message.createMessageComponentCollector({ filter, time: 60000 });

                collector.on('collect', async (i) => {
                    if (i.customId === 'configure') {
                        let updatedSettingsEmbed = new EmbedBuilder()
                            .setTitle(":wrench: Configure Settings")
                            .setDescription("Please choose an option to configure.");
                        await i.update({ embeds: [updatedSettingsEmbed], components: [] });
                    } else {
                        await i.reply('Unknown button clicked.');
                    }
                });

                collector.on('end', collected => console.log(`Collected ${collected.size} items`));

            } catch (error) {
                console.error(error);
                await interaction.followUp('Failed to parse `settings.json`. Please tell the guild owner to fix this.');
            }
        });
    }    
};
