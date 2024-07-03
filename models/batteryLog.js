const mongoose = require('mongoose');

const batteryLogSchema = new mongoose.Schema({
  droneSerialNumber: { type: String, required: true },
  batteryLevel: { type: Number, required: true },
  checkedAt: { type: Date, default: Date.now, required: true }
});

const BatteryLog = mongoose.model('BatteryLog', batteryLogSchema);

module.exports = BatteryLog;
