// EXPRESS
var express = require('express');
var router = express.Router();

// SERVICES
var globalSettingsService = require('../services/gloalSettingsService');







// GET

// GET choose period global setting
router.get('/choose-period', async (req, res, next) => {
    try {
        const choosePeriod = await globalSettingsService.getChoosePeriod();
        res.send({ choosePeriod: choosePeriod });
    } catch(e) {
        next(e);
    }
});








// PUT 

// EDIT choose period gloal setting
router.put('/choose-period', async (req, res, next) => {
    try {
        const choosePeriod = req.body.choosePeriod;
        if (!(typeof choosePeriod === 'boolean')) {
            return res.status(400).send({ error: 'Choose Period must be a boolean' });
        }

        await globalSettingsService.editChoosePeriod(choosePeriod);
        res.send({ message: 'Período de escolha editado com sucesso' });
    } catch (e) {
        next(e);
    }
});








module.exports = router;