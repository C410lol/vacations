const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;




const userSchema = new Schema({
    "name": { type: Types.String, required: true },
    "email": { type: Types.String, unique: true, required: true },
    "vacations": { type: Types.ObjectId, ref: 'Vacation' }
});

module.exports = mongoose.model("User", userSchema);