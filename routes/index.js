let express = require('express');
let router = express.Router();

router.use('/light', require('./light.route.js'));

module.exports = router;
