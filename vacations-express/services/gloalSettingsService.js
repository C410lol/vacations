var GlobalSettings = require('../models/GlobalSettingsModel');




// GET 
module.exports.getChoosePeriod = async () => {
    const globalSettings = await GlobalSettings.findOne().exec();
    return globalSettings.choosePeriod;
}








// PUT
module.exports.editChoosePeriod = async (choosePeriod) => {
    const globalSettings = await GlobalSettings.findOne().exec();

    globalSettings.choosePeriod = choosePeriod;

    return globalSettings.save();
}