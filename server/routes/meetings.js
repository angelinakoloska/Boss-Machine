const express = require('express');
const meetingsRouter = express.Router();
const db = require('../db');
// const { min } = require('mocha/lib/reporters');

meetingsRouter.get('/', (req, res, next) => {
    const meetings = db.getAllFromDatabase('meetings');
    res.send(meetings);
})

meetingsRouter.post('/', (req, res, next) => {
    let added = db.createMeeting();
    if (added) {
        res.status(201).send(added)
    }
    res.status(400).send();
})


meetingsRouter.delete('/', (req, res, next) => {
    if (db.deleteAllFromDatabase('meetings')) {
        return res.status(204).send();
    }
    res.status(404).send();
})

module.exports = meetingsRouter;