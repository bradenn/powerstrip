const env = require('../env/env');
const {updateDevice} = require('../services/light.service');
const {updateRGB, statusRGB} = require('../services/rgb.service');
const {httpResponse, httpError} = require('../utils/http-response');

const redis = require("redis");
const client = redis.createClient(6379, env.REDIS);
syncDmx();

function syncDmx() {
    for(let i = 1; i <= 16; i++){
        client.get(`dmx_${i}`, (err, doc) => {
            if(doc == null){
                client.set(`dmx_${i}`, 0);
            }else{
                updateDevice(i, map_range(doc, 0, 100, 0, 255)).then(() => {
                    console.log(`Synced state for dmx_${i} to ${doc}`);
                }).catch(() => {
                    console.log('Failed to update');
                });
            }
        });
    }
}

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

let get = (req, res, next) => {
    let deviceId = req.params.device;
    client.get(`dmx_${deviceId}`, (err, doc) => {
        res.send(`${(doc != null) ? (doc !== '0') ? 1 : 0 : 0}`);
    });
};


let getDim = (req, res, next) => {
    let deviceId = req.params.device;
    client.get(`dmx_${deviceId}`, (err, doc) => {
        res.send(doc || 0);
    });
};

let put = (req, res, next) => {

    let deviceId = req.params.device;
    let value = (req.params.value > 100) ? 100 : req.params.value;
    let formattedValue = map_range(value, 0, 100, 0, 255);

    updateDevice(deviceId, formattedValue).then(() => {
        client.set(`dmx_${deviceId}`, value);
        next(httpResponse(200, "Light updated."));
    }).catch(() => {
        next(httpError(500, "Light not updated."));
    });

};

let rgb_get = (req, res, next) => {
    res.send(statusRGB());
};

let rgb_put = (req, res, next) => {

    let deviceId = req.params.device;
    let value = req.params.value;

    updateRGB(deviceId, value).then(() => {
        next(httpResponse(200, "RGB Toggled."));
    }).catch(() => {
        next(httpError(500, "RGB not Toggled."));
    });

};


module.exports = {
    get,
    getDim,
    put,
    rgb_get,
    rgb_put
};