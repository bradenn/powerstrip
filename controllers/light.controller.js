const {updateDevice} = require('../services/light.service');
const {httpResponse, httpError} = require('../utils/http-response');

let state = {};


let get = (req, res, next) => {
    let deviceId = req.params.device;
    res.send(`${(state[deviceId] === '255')?1:0}`);
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


module.exports = {
    get,
    put
};