const express = require('express');
const router = express.Router();
const droneController = require('../controllers/droneController');

router.post('/register', droneController.registerDrone);
router.post('/:id/load', droneController.loadDrone);
router.get('/:id/medications', droneController.getLoadedMedications);
router.get('/available', droneController.getAvailableDrones);
router.get('/:id/battery', droneController.getBatteryLevel);


module.exports = router;
