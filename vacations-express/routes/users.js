//EXPRESS
var express = require('express');
var router = express.Router();


//MODELS
var userModel = require('../models/userModel');
var vacationModel = require('../models/vacationModel');
const mongoose = require('mongoose');


//SERVICES
import createToken from '../services/tokenService.js';
import sendAuthLinkEmail from '../services/mailService.js';




/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send(await userModel.find().exec());
});

/* GET user vacations */
router.get('/:userId/vacation', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (userId == null) return res.status(400).send({ error: "Param 'userId' é requisitado" }); 

    const mongooseId = new mongoose.Types.ObjectId(userId);
    const vacations = await vacationModel.aggregate([
      {
        $match: { user: mongooseId },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user'
        },
      },
      { 
        $lookup: {
          from: 'vacationperiods',
          localField: '_id',
          foreignField: 'vacation',
          as: 'vacationPeriods'
        }
      },
      { $unwind: '$user' }
    ]).exec();

    var hasVacation = false;
    if (vacations[0] != null) hasVacation = true;

    res.send({ vacation: vacations[0], hasVacation: hasVacation });
  } catch (e) {
    next(e);
  }
});




/* POST login user */
router.post('/login', async (req, res, next) => {
  try {
    var userId;
    var userEmail;

    const userByEmail = await userModel.findOne({ email: req.body.email }).exec();
    if (userByEmail) {
      userId = userByEmail._id;
      userEmail = userByEmail.email;
    } else {
      const createdUser = await userModel.create(req.body);

      userId = createdUser._id;
      userEmail = createdUser.email;
    }

    const createdToken = await createToken(userId);
    const sentEmail = await sendAuthLinkEmail(userEmail, createdToken.token);

    res.send('Link de autenticação enviado para seu email');
  } catch (e) {
    next(e);
  }
});




module.exports = router;
