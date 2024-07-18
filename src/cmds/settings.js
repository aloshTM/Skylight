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

        const configureRow = new ActionRowBuilder()
            .addComponents(configure);
            
        const down = new ButtonBuilder()
            .setCustomId("down")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("⬇️");
        
        const up = new ButtonBuilder()
            .setCustomId("up")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("⬆️");
        
        const toggle = new ButtonBuilder()
            .setCustomId("toggle")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("🔄");
        
        const save = new ButtonBuilder()
            .setCustomId("save")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("💾");
        
        const configureSettingsRow = new ActionRowBuilder()
            .addComponents(save, down, up, toggle);

        // there could DEFINITELY be a beter way to do this but i cba rn

        let currentSelectionIndex = 0;
        let isSettingsDisplayed = false;

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

                const message = await interaction.followUp({ embeds: [settingsEmbed], components: [configureRow] });
                
                const filter = (i) => i.user.id === interaction.user.id;

                const collector = message.createMessageComponentCollector({ filter, time: 60000 });

                const finished = new EmbedBuilder()
                    .setTitle(":gear: Settings")
                    .setDescription("Settings have been configured.");

                collector.on('collect', async (i) => {
                    try {
                        const data = await fs.promises.readFile(settingsPath, 'utf8');
                        const settings = JSON.parse(data);
                        const settingsKeys = Object.keys(settings);

                        let updatedSettingsEmbed = new EmbedBuilder()
                        .setTitle(":wrench: Configure Settings")
                        .setDescription("Please choose an option to configure.");
                        settingsKeys.forEach((key, index) => {
                            const value = settings[key];
                            const emoji = value ? ':white_check_mark:' : ':x:';
                            const name = getSettingName(key);
                            const description = getSettingDescription(key);
                            if (index === currentSelectionIndex) {
                                updatedSettingsEmbed.addFields({ name: `[${emoji}] ${name}`, value: `${description}\n` });
                            } else {
                                updatedSettingsEmbed.addFields({ name: `${emoji} ${name}`, value: `${description}\n` });
                            }
                        });

                        if (i.customId === 'down' || i.customId === 'up') {
                            isSettingsDisplayed = true;
                            currentSelectionIndex = i.customId === 'down' ?
                                (currentSelectionIndex + 1) % settingsKeys.length :
                                (currentSelectionIndex - 1 + settingsKeys.length) % settingsKeys.length;
                        } else if (i.customId === 'toggle') {
                            if (isSettingsDisplayed) {
                                const settingKey = settingsKeys[currentSelectionIndex];
                                settings[settingKey] = !settings[settingKey];
                            }
                        } else if (i.customId === 'configure') {
                            isSettingsDisplayed = true;
                            await i.update({ embeds: [updatedSettingsEmbed], components: [configureSettingsRow] });
                        } else if (i.customId === 'save') {
                            if (isSettingsDisplayed) {
                                await fs.promises.writeFile(settingsPath, JSON.stringify(settings, null, 2));
                                isSettingsDisplayed = false;
                                console.log("Settings have been saved.");
                                await i.update({ embeds: [finished], components: [] });
                            }
                        }

                        await i.update({ embeds: [updatedSettingsEmbed], components: [configureSettingsRow] });
                    } catch (error) {
                        console.error(error);
                        await i.reply('Failed to parse `settings.json`. Please tell the guild owner to fix this.');
                    }
                });

            } catch (error) {
                console.error(error);
                await interaction.followUp('Failed to parse `settings.json`. Please tell the guild owner to fix this.');
            }
        });
    }    
};
