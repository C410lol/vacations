const crypto = require('crypto');
const tokenModel = require('../models/tokenModel');




// FIND
module.exports.findTokenByUserId = async (userId) => {
    return tokenModel.findOne({ user: userId }).exec();
}








// CREATE
module.exports.createToken = async (userId) => {
    const token = crypto.randomBytes(32).toString('hex');

    return tokenModel.create({ 
        token: token,
        user: userId 
    });
}








// DELETE 
module.exports.findAndDeleteToken = async (token) => {
    return tokenModel.findOneAndDelete({ token: token }).populate('user').exec();
}
