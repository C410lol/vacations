const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;




const vacationPeriodSchema = new Schema({
    "vacation": { type: Types.ObjectId, ref: 'Vacation', require: true },
    "startDate": { type: Types.Date, required: true },
    "endDate": { type: Types.Date, required: true }
});

module.exports = mongoose.model('VacationPeriod', vacationPeriodSchema);