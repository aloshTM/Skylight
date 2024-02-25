function getSettingName(settingKey) {
    switch (settingKey) {
        case 'verbose':
            return 'Verbose Messages';
        case 'log':
            return 'Log Actions';
        default:
            return settingKey; 
    }
}

module.exports = { getSettingName };
