const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Disallows the user to interact with the guild.'),
    async execute(interaction) {
        interaction.reply("test")
    }    
}