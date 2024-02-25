const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('settings')
        .setDescription('Configure the settings of this bot.'),
    async execute(interaction) {
        await interaction.reply(":thinking:")
        let settingsEmbed = new EmbedBuilder()
            .setTitle(":wrench: Settings")
            .setDescription(":")
        interaction.followUp({ embeds: [settingsEmbed] })
    }    
}