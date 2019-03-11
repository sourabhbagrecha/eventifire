const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main');

router.get('/', mainController.getHome);
router.get('/event/:id', mainController.getEvent);

module.exports = router;