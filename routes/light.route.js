let express = require('express');
let router = express.Router();

let lightController = require('../controllers/light.controller');


router.route('/:device/:value')
    .get(lightController.put)


router.route('/:device')
    .get(lightController.get)






module.exports = router;
