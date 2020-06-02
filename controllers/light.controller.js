const {updateDevice, updateRGB, statusRGB} = require('../services/light.service');
const {httpResponse, httpError} = require('../utils/http-response');

let state = {};

let get = (req, res, next) => {
    let deviceId = req.params.device;
    res.send(`${(state[deviceId] === '255')?1:0}`);
};


let getDim = (req, res, next) => {
    let deviceId = req.params.device;
    res.send(state[deviceId]);
};

let put = (req, res, next) => {

    let deviceId = req.params.device;
    let value = req.params.value;

    updateDevice(deviceId, value).then(() => {
        state[deviceId] = value;
        next(httpResponse(200, "Light Toggled."));
    }).catch(() => {
        next(httpError(500, "Light not Toggled."));
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