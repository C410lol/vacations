const crypto = require('crypto');
const tokenModel = require('../models/tokenModel');




export const createToken = (userId) => {
    const token = crypto.randomBytes(32).toString('hex');
    const expirationDate = new Date(new Date().getDate() + 10);

    return tokenModel.create({ 
        token: token, 
        expirationDate: expirationDate, 
        user: userId 
    });
}
