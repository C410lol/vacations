const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = Schema.Types;




const tokenSchema = new Schema({
    "token": { type: Types.String, required: true },
    "expirationDate": { type: Types.Date, required: true },
    "user": { type: Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Token", tokenSchema);