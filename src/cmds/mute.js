const { SlashCommandBuilder } = require('discord.js')

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
        const userId = user.id
        interaction.editReply(`:white_check_mark: <@${userId}>`)
    }    
}