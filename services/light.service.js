const env = require('../env/env');

const DMX = require('dmx');
const dmx = new DMX();
const universe = dmx.addUniverse('demo', 'enttec-open-usb-dmx', env.SERIAL);



let updateDevice = (device, value) => new Promise((resolve, reject) => {
    try {
        let payload = {};
        payload[device] = value;
        universe.update(payload);
        resolve();
    } catch {
        reject();
    }
});

module.exports = {
    updateDevice
};