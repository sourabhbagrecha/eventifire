const express = require('express');
const router = express.Router();

const mainRoutes = require('./main');
const authRoutes = require('./auth');
const orgRoutes = require('./organizer');

router.use('/', mainRoutes);
router.use('/auth', authRoutes);
router.use('/organizer', orgRoutes);

module.exports = router;