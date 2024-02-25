function getSettingDescription(settingKey) {
    switch (settingKey) {
        case 'verbose':
            return 'Allow the bot to reply detailed messages of what happened instead of just emojis.';
        case 'log':
            return 'Allow the bot to log every moderation action. (please set the channel id.)';
        default:
            return settingKey;
    }
}

module.exports = { getSettingDescription };
