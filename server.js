const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cron = require('node-cron');
const droneRoutes = require('./routes/drones');
const medicationRoutes = require('./routes/medications');
const Drone = require('./models/drone'); // Ensure this import is correct
const BatteryLog = require('./models/batteryLog'); // A new model for logging battery levels

const app = express();

// Middleware
app.use(bodyParser.json());

// Database Connection
mongoose.connect('mongodb://localhost:27017/droneDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Routes
app.use('/drones', droneRoutes);
app.use('/medications', medicationRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Periodic Task to check Drone Battery Levels and Log History
cron.schedule('*/10 * * * *', async () => {
  try {
    const drones = await Drone.find({});
    drones.forEach(async (drone) => {
      console.log(`Drone ${drone.serialNumber} battery level: ${drone.batteryCapacity}%`);

      // Log the battery level to the database
      const log = new BatteryLog({
        droneSerialNumber: drone.serialNumber,
        batteryLevel: drone.batteryCapacity,
        checkedAt: new Date()
      });
      await log.save();
    });
    console.log('Battery levels checked and logged');
  } catch (error) {
    console.error('Error checking drone battery levels:', error);
  }
});

// Start the Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
