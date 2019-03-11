const express = require('express');
const router = express.Router();

const orgController = require('../controllers/organizer');

router.get('/', orgController.getDashboard);
router.get('/new', orgController.getEventForm);
router.get('/edit/:id', orgController.getEventEdit);
router.post('/new', orgController.postEvent);
router.post('/edit/:id', orgController.editEvent);
router.post('/delete/:id', orgController.deleteEvent);

module.exports = router;