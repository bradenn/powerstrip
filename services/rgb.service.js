const env = require('../env/env');

let serialPort = require('serialport');
const Readline = require('@serialport/parser-readline')
let port = new serialPort(env.ARDUINO, {baudRate: 9600});

const parser = new Readline()
port.pipe(parser)

let status = {R: 0, G: 0, B: 0, P: 0};

parser.on('data', line => {
    let mode = line.substr(0, 1);
    if (mode === 'P') {
        console.log(`RECV: Parity: ${parseInt(line.substr(1))}, SENT: ${status['P']}`)
        port.write(`R${status['R']}\n`);
        port.write(`G${status['G']}\n`);
        port.write(`B${status['B']}\n`);
        port.write(`P${status['P']}\n`);
    }
});

let statusRGB = () => {
    return `${status['R'].toString(16)}${status['G'].toString(16)}${status['B'].toString(16)}`;
};

let updateRGB = (device, value) => new Promise((resolve, reject) => {
    try {
        let r = parseInt(value.substr(0, 2), 16);
        let g = parseInt(value.substr(2, 2), 16);
        let b = parseInt(value.substr(4, 2), 16);
        let p = (r+g+b);
        console.log(`SEND: Parity: ${p}`)

        status['R'] = r;
        status['G'] = g;
        status['B'] = b;
        status['P'] = p;

        port.write(`R${r}\n`);
        port.write(`G${g}\n`);
        port.write(`B${b}\n`);
        port.write(`P${p}\n`);
        resolve();
    } catch {
        reject();
    }
});


module.exports = {
    updateRGB,
    statusRGB
};