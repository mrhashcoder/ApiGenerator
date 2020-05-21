const express = require('express');
const router = express.Router();

const control = require('../Controllers/indexControl')


router.get('/',control.indexControl);

router.get('/error',control.errorControl);


module.exports = router;