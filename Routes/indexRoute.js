const express = require('express');
const router = express.Router();

const control = require('../Controllers/indexControl')


router.get('/',control.indexControl);



module.exports = router;