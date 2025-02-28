const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;




const vacationSchema = new Schema({
    "user": { type: Types.ObjectId, ref: 'User', require: true },
    "selectedDate": { type: Types.Date, require: true },
    "vacationPeriods": [{ type: Types.ObjectId, ref: 'VacationPeriod' }]
});

module.exports = mongoose.model('Vacation', vacationSchema);