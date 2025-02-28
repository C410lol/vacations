//EXPRESS
var express = require('express');
var router = express.Router();


//MODELS
var userModel = require('../models/userModel');




/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send(await userModel.find().exec());
});


/* POST login user */
router.post('/login', async (req, res, next) => {
  try {
    //Check if user exists by email
    const userByEmail = await userModel.findOne({ email: req.body.email }).exec();
    if (userByEmail != null) {
      return res.send(userByEmail);
    }
    
    res.status(201).send(await userModel.create(req.body));
  } catch (e) {
    next(e);
  }
});




module.exports = router;
