const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const Types = Schema.Types;




const userSchema = new Schema(
    {
    "name": { type: Types.String, required: true },
    "email": { type: Types.String, unique: true, required: true },
    "role": { type: Types.String, required: true },
    "position": { type: Types.Number },
    "vacation": { type: Types.ObjectId, ref: 'Vacation' }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

userSchema.plugin(AutoIncrement, { inc_field: 'position' });




module.exports = mongoose.model("User", userSchema);