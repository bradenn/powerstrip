let fs = require('fs').promises;
let Mustache = require('mustache');

let generateTemplate = (template, data) => new Promise((resolve, reject) => {
    fs.readFile(template, 'utf-8').then(doc => {
        resolve(Mustache.render(doc, data));
    }).catch(err => {
        reject(err);
    });
});

module.exports = {generateTemplate};