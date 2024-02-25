const { SlashCommandBuilder } = require('discord.js')
const action = require('../modules/actions/mute-action')
const fs = require('node:fs')
const path = require('node:path')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Disallows the user to interact with the guild.')
        .addUserOption(option =>
                option
                    .setName("user")
                    .setDescription("Which user would you like to mute?")
                    .setRequired(true)),
    async execute(interaction) {
        await interaction.reply(":thinking:")
        const user = interaction.options.getUser('user')
        const member = interaction.options.getMember('user')
        const userId = user.id
        const settingsPath = path.join(__dirname, '..', 'settings.json');

        fs.readFile(settingsPath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                interaction.followUp('Failed to parse `settings.json`. Please contact the guild owner to fix this.');
                return;
            }
            try {
                const settings = JSON.parse(data);
                const description = 'Allow the bot to reply detailed messages of what happened instead of just emojis.'

                interaction.followUp( settings.verbose ? 'test' : ':white_check_mark:');
            } catch (error) {
                console.error(error);
                interaction.editReply('Failed to parse `settings.json`. Please contact the guild owner to fix this.');
            }
        });

        action(member)
    }    
}