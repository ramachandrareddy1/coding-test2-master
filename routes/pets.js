const express = require('express');
const Joi = require('@hapi/joi');

const Pet = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.post(
    '/',
    validateBody(Joi.object().keys({
        name: Joi.string().required().description('Pet name'),
        age: Joi.number().integer().required().description('Pet age'),
        colour: Joi.string().required().description('Pet age'),
    }), {
        stripUnknown: true,
    }),
    async(req, res, next) => {
        try {
            const user = new Pet(req.body);
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    }
);

router.get('/',
    async(req, res, next) => {
        try {
            let query = req.query;
            let data = await Pet.find(query);
            res.status(200).json(data);
        } catch (e) {
            next(e);
        }
    }
);

router.delete('/:petName',
    async(req, res, next) => {
        try {
            let data = await Pet.remove({ name: req.params.petName });
            res.status(200).json(data);
        } catch (e) {
            next(e);
        }
    }
);



module.exports = router;