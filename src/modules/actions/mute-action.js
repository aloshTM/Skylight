const { EmbedBuilder } = require('discord.js');

module.exports = (target, duration, reason = null) => {
    // duration handler (https://github.com/aloshTM/HammerBot/blob/33d605393181639c3f130a0743c16362a64c8035/commands/mute.js)

    if (durationType === 'h') {
        durationMs = durationValue * 60 * 60 * 1000;
        durationWord = durationValue === 1 ? 'hour' : 'hours';
    } else if (durationType === 'm') {
        durationMs = durationValue * 60 * 1000;
        durationWord = durationValue === 1 ? 'minute' : 'minutes';
    } else if (durationType === 'd') {
        durationMs = durationValue * 24 * 60 * 60 * 1000;
        durationWord = durationValue === 1 ? 'day' : 'days';
    } else if (durationType === 'w') {
        durationMs = durationValue * 7 * 24 * 60 * 60 * 1000;
        durationWord = durationValue === 1 ? 'week' : 'weeks';
    }
};
