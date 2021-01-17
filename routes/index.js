const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/pets', require('./pets'));
router.use('/data-transform', require('./api/transform'));

module.exports = router;