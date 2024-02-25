const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const action = require('../modules/actions/mute-action');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Disallows the user to interact with the guild.')
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("Which user would you like to mute?")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        await interaction.reply(":thinking:"); 

        const user = interaction.options.getUser('user');
        const member = interaction.options.getMember('user')
        const settingsPath = path.join(__dirname, '..', 'settings.json');
        const moderator = interaction.user

        const Verbose = new EmbedBuilder()
            .setTitle(':white_check_mark: Success!')
            .setDescription(`You have successfully muted <@${user.id}>`)
            .setColor('#29f50a');

        fs.readFile(settingsPath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return interaction.followUp('Failed to parse `settings.json`. Please contact the guild owner to fix this.');
            }

            try {
                const settings = JSON.parse(data);

                if (user.id === moderator.id | user.bot) {
                    interaction.editReply(settings.verbose ? "You can't mute this user." : ':x:');
                    return
                }

                try {
                    action(member); 
                    interaction.followUp(settings.verbose ? { embeds: [Verbose] } : ':white_check_mark:');
                } catch (error) {
                    console.log(error);
                    interaction.followUp(settings.verbose ? "We're sorry, but there was an error muting this user." : ":x:");
                    return
                }
            } catch (error) {
                console.error(error);
                interaction.followUp('Failed to parse `settings.json`. Please contact the guild owner to fix this.');
            }
        });
    }
};