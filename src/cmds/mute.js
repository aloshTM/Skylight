const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('test'),
    async execute(interaction) {
        interaction.reply("test")
    }    
}