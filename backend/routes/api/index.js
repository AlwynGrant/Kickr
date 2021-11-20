const router = require('express').Router();

const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const imageRouter = require('./image.js');

router.use('/images', imageRouter);

router.use('/session', sessionRouter);

router.use('/user', usersRouter);


module.exports = router;
