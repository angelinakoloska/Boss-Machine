const express = require('express');
const apiRouter = express.Router();

const minionsRouter = require('./routes/minions')
const meetingsRouter = require('./routes/meetings');
const ideasRouter = require('./routes/ideas');

apiRouter.use('/minions',minionsRouter)
apiRouter.use('/meetings', meetingsRouter);
apiRouter.use('/ideas', ideasRouter);



module.exports = apiRouter;
