//EXPRESS
var express = require('express');
var router = express.Router();


//MODELS
var userModel = require('../models/userModel');
var vacationModel = require('../models/vacationModel');
const mongoose = require('mongoose');


//SERVICES
const tokenService = require('../services/tokenService');
const mailService = require('../services/mailService');




/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.send(await userModel.find().exec());
});

// GET users by their position
router.get('/by-position', async (req, res, next) => {
  try {
    const usersByPosition = await userModel.aggregate([
      {
        $lookup: {
          from: 'vacations',
          localField: '_id',
          foreignField: 'user',
          as: 'vacation'
        }
      },
      {
        $sort: { position: 1 }
      },
      {
        $unwind: {
          path: '$vacation',
          preserveNullAndEmptyArrays: true
        }
      }
    ]);
    res.send(usersByPosition);
  } catch (e) {
    next(e);
  }
});

router.get('/auth', async (req, res, next) => {
  try {
    const tokenParam = req.query.token;
    if (!tokenParam) return res.status(400).send({ error: "Query param 'token' é requisitado" });

    const token = await tokenService.findAndDeleteToken(tokenParam);
    if (!token) return res.status(404).send({ error: 'Token não encontrado' });

    res.send(token);
  } catch(e) {
    next(e);
  }
}); 

/* GET user vacations */
router.get('/:userId/vacation', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (!userId) return res.status(400).send({ error: "Param 'userId' é requisitado" }); 

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
    if (vacations[0]) hasVacation = true;

    res.send({ vacation: vacations[0], hasVacation: hasVacation });
  } catch (e) {
    next(e);
  }
});








/* POST login user */
router.post('/login', async (req, res, next) => {
  try {
    const body = req.body;

    var userId;
    var userEmail;

    const userByEmail = await userModel.findOne({ email: body.email }).exec();
    if (userByEmail) {
      userId = userByEmail._id;
      userEmail = userByEmail.email;
    } else {
      body.role = 'user';
      const createdUser = await userModel.create(body);
      
      userId = createdUser._id;
      userEmail = createdUser.email;
    }

    var token;
    const tokenByUserId = await tokenService.findTokenByUserId(userId);
    if (tokenByUserId) {
      token = tokenByUserId;
    } else token = await tokenService.createToken(userId);

    await mailService.sendAuthLinkEmail(userEmail, token.token);

    res.send('Link de autenticação enviado para seu email');
  } catch (e) {
    next(e);
  }
});








// PUT change users position
router.put('/change-positions', async (req, res, next) => {
  try {
    const body = req.body;
    if (!body) return res.status(400).send({ error: 'Body required' });
    if (!Array.isArray(body)) return res.status(400).send({ error: 'Body must be an array' });

    for (let index = 0; index < body.length; index++) {
      const currentUser = body[index];
      currentUser.position = index + 1;

      await userModel.findByIdAndUpdate(currentUser._id, currentUser);
    }

    res.send({ message: 'Posições alteradas com sucesso' });
  } catch (e) {
    next(e);
  }
});








module.exports = router;
