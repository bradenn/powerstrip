let express = require('express');
let router = express.Router();

router.use('/light', require('./light.route.js'));
router.use('/rgb', require('./rgb.route.js'));

module.exports = router;
