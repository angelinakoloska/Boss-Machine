const express = require('express');
const minionsRouter = express.Router();
const db = require('../db');
//const { min } = require('mocha/lib/reporters')

minionsRouter.get('/', (req, res, next) => {
    const minions = db.getAllFromDatabase('minions');
    res.send(minions);
})

minionsRouter.post('/', (req, res, next) => {
    const newMinion = req.body;
    let added = db.addToDatabase('minions', newMinion);
    if (added) {
        res.status(200).send(added)
    }
    res.status(400).send();
})

minionsRouter.param('minionId', (req, res, next, id) => {
    let minionId = Number(id);
    const found = db.getFromDatabaseById('minions', id);
    if (found !== null) {
        req.minion = found
        req.minionId = id;
        return next();
    }
    res.status(404).send(null);
})

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
})

minionsRouter.put('/:minionId', (req, res, next) => {
    let found = db.updateInstanceInDatabase('minions', req.body);
    if (found) {
        return res.send(found);
    }
    res.status(400).send(found);
})

minionsRouter.delete('/:minionId', (req, res, next) => {
    let found = db.deleteFromDatabasebyId('minions', req.minionId);
    if (found) {
        return res.status(204).send();
    }
    res.status(404).send();
})

module.exports = minionsRouter;