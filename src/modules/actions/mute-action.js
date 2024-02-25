const { EmbedBuilder } = require('discord.js');

module.exports = (target, duration, reason = null) => {
	// TODO add verbose messages setting handling
    target.timeout(60_000)
};
