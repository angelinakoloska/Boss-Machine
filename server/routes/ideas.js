const express = require('express');
const ideasRouter = express.Router();
const db = require('../db');
// const { min } = require('mocha/lib/reporters');

ideasRouter.get('/', (req, res, next) => {
    const ideas = db.getAllFromDatabase('ideas');
    res.send(ideas);
})

ideasRouter.post('/', (req, res, next) => {
    const newIdea = req.body;
    let added = db.addToDatabase('ideas', newIdea);
    if (added) {
        res.status(200).send(added)
    }
    res.status(400).send();
})

ideasRouter.param('ideaId', (req, res, next, id) => {
    let ideaId = Number(id);
    const found = db.getFromDatabaseById('ideas', id);
    if (found !== null) {
        req.idea = found
        req.ideaId = id;
        return next();
    }
    res.status(404).send(null);
})

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
})

ideasRouter.put('/:ideaId', (req, res, next) => {
    let found = db.updateInstanceInDatabase('ideas', req.body);
    if (found) {
        return res.send(found);
    }
    res.status(400).send(found);
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
    let found = db.deleteFromDatabasebyId('ideas', req.ideaId);
    if (found) {
        return res.status(204).send();
    }
    res.status(404).send();
})

module.exports = ideasRouter;