//EXPRESS
var express = require('express');
var router = express.Router();


//MODELS
var mongoose = require('mongoose');
var vacationModel = require('../models/vacationModel');
var vacationPeriodModel = require('../models/vacationPeriodModel');
var userModel = require('../models/userModel');




/* GET vacations list */
router.get('/', async (req, res, next) => {
    try {
        var dbOptions = [
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
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
        ];

        const excludeId = req.query.excludeId;
        if (excludeId) {
            dbOptions.unshift({
                $match: { 
                    user: { $ne: new mongoose.Types.ObjectId(excludeId) }
                }
            });
        }

        const vacations = await vacationModel.aggregate(dbOptions).exec();

        res.send({ vacations: vacations, hasVacations: vacations.length > 0 });
    } catch (e) {
        next(e);
    }
});


/* GET list all forbidden date ranges */
router.get('/forbidden', async (req, res, next) => {
    try  {
        const vPeriods = await vacationPeriodModel.find().exec();
        var vPeriods1 = Array.from(vPeriods);

        var forbiddenDates = [];

        for (var x = 0; x < vPeriods.length; x++) {
            for (var y = 1; y < vPeriods1.length; y++) {
                const sDate0 = vPeriods[x].startDate;
                const eDate0 = vPeriods[x].endDate;
                const sDate1 = vPeriods1[y].startDate;
                const eDate1 = vPeriods1[y].endDate;

                if (sDate0 >= sDate1 && sDate0 <= eDate1) {
                    forbiddenDates = forbiddenDates.concat(getDatesInRange([sDate0, eDate1]));
                } else if (eDate0 >= sDate1 && eDate0 <= eDate1) {
                    forbiddenDates = forbiddenDates.concat(getDatesInRange([sDate1, eDate0]));
                }
            }

            vPeriods1.splice(0, 1);
        }

        res.send(forbiddenDates);
    } catch(e) {
        next(e);
    }
});

const getDatesInRange = (range) => {
    var dates = [];

    var currentDate = new Date(new Date(range[0]));
    var endDate = new Date(new Date(range[1]));

    currentDate.setDate(currentDate.getDate());
    endDate.setDate(endDate.getDate());

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}








/* POST create vacation */
router.post('/', async (req, res, next) => {
    try {
        //Find user
        const userId = req.query.userId;
        if (userId == null) {
            return res.status(400).send({ error: "Query param 'userId' é obrigatório" });
        }
        const userById = await userModel.findById(userId).exec();
        if (userById == null) {
            return res.status(404).send({ error: `Usuário com id: ${userId} não encontrado` });
        }
    
        //Vacation periods checks
        const vPeriods = req.body.vacationPeriods;
        if (vPeriods.length != 2) {
            return res.status(400).send({ error: 'As férias devem ter apenas 2 períodos' });
        }

        const vPeriodsDB = await vacationPeriodModel.find().exec();
        for (const vPeriod of vPeriods) {
            const startDate = new Date(vPeriod.startDate);
            const endDate = new Date(vPeriod.endDate);
    
            //Check if the the period is of 15 days
            const difference = ((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
            if (difference != 15) {
                return res.status(400).send({ error: 'O período de férias não possue 15 dias' });
            }
    
            //Check if there is no other vacation with the same periods
            var counter = 0;
            for (const vPeriodDB of vPeriodsDB) {
                if (
                    (startDate >= vPeriodDB.startDate && startDate <= vPeriodDB.endDate) ||
                    (endDate >= vPeriodDB.startDate && endDate <= vPeriodDB.endDate)
                ) counter++;
                if (counter == 2) {
                    return res.status(409).send({ error: 'O período selecionado já possui 2 reservas' });
                }
            }
        }
    
        //Create vacation
        const vacation = new vacationModel();
        vacation.user = userId;
        vacation.selectedDate = Date.now();
        await vacation.save();
    
        //Creating vacation periods
        for (const vPeriod of vPeriods) {
            await vacationPeriodModel.create({
                vacation: vacation._id,
                startDate: vPeriod.startDate,
                endDate: vPeriod.endDate
            });
        }
        
        res.status(201).send(vacation);
    } catch (e) {
        next(e);
    }
});




/* PUT edit vacation */ 
router.put('/:vacationId', async (req, res, next) => {
    try {
        //Find vacation by id
        const vacationId = req.params.vacationId;
        if (vacationId == null) {
            return res.status(400).send({ error: "Param 'id' é requisitado" });
        }
        const vacationById = await vacationModel.findById(vacationId).exec();
        if (vacationById == null) {
            return res.status(404).send({ error: `Férias com id ${vacationId} não encontrada` });
        }

        //Check vacation periods
        const vPeriods = req.body.vacationPeriods;
        if (vPeriods.length != 2) {
            return res.status(400).send({ error: 'As férias devem ter apenas 2 períodos' });
        }

        const vPeriodsDB = await vacationPeriodModel.find({ vacation: { $ne: vacationId } }).exec();
        for (const vPeriod of vPeriods) {
            const startDate = new Date(vPeriod.startDate);
            const endDate = new Date(vPeriod.endDate);

            //Check if the period is of 15 days
            const difference = ((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
            if (difference != 15) {
                return res.status(400).send({ error: 'O período de férias não possue 15 dias' });
            }

            //Check if there is no other vacation with the same periods
            var counter = 0;
            for (const vPeriodDB of vPeriodsDB) {
                if (
                    (vPeriodDB.startDate <= startDate && vPeriodDB.endDate >= endDate) ||
                    (vPeriodDB.startDate <= startDate && vPeriodDB.endDate >= endDate)
                ) counter++;
                if (counter == 2) {
                    return res.status(409).send({ error: 'O período selecionado já possui 2 reservas' });
                }
            }
        }

        //Delete last vacation periods
        await vacationPeriodModel.deleteMany({ vacation: vacationId }).exec();

        //Set new vacation periods
        vPeriods.forEach(async (e) => {
            await vacationPeriodModel.create({
                vacation: vacationId,
                startDate: e.startDate,
                endDate: e.endDate
            });
        });

        res.send('Férias editada com sucesso');
    } catch (e) {
        next(e);
    }
});




module.exports = router;