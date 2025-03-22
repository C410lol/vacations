var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Types = Schema.Types;




const globalSettingsSchema = new Schema({
    "choosePeriod": { type: Types.Boolean, required: true }
});

module.exports = mongoose.model('GlobalSettings', globalSettingsSchema);