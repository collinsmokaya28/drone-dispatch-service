const Drone = require('../models/drone');
const Medication = require('../models/medication');

exports.registerDrone = async (req, res) => {
    try {
        const drone = new Drone(req.body);
        await drone.save();
        res.status(201).send(drone);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.loadDrone = async (req, res) => {
    try {
        const drone = await Drone.findById(req.params.id);
        if (!drone) {
            return res.status(400).send({error: 'Drone not found' });
        }
        if (drone.batteryCapacity < 25 && drone.state === 'LOADING') {
            return res.status(400).send({error: 'Battery level too low to load medication' });
        }
        let totalWeight = 0;
        for (const medication of req.body.medications) {
            const med = await Medication.findById(medication);
            totalWeight += med.weight;
        }
        if (totalWeight > drone.weightLimit) {
            return res.status(400).send({error: 'Weight limit exceeded' });
        }
        drone.medications.push(...req.body.medications);
        await drone.save();
        res.send(error);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getLoadedMedications = async (req, res) => {
    try {
        const drone = await Drone.findById(req.params.id).populate('medications');
        if (!drone) {
            return res.status(400).send({error: 'Drone not found' });
        }
        res.send(drone.medications);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAvailableDrones = async (req, res) => {
    try {
        const drones = await Drone.find({ state: 'IDLE', batteryCapacity: { $gte: 25} });
        res.send(drones);
    } catch (error) {
        res.status(400).send(error);
    }
};


exports.getBatteryLevel = async (req, res) => {
    try {
        const drone = await Drone.findById(req.params.id);
        if (!drone) {
            return res.status(400).send({ error: 'Drone not found' });
        }
        res.send({ batteryCapacity: drone.batteryCapacity });
    } catch (error) {
        res.status(400).send(error);
    }
};