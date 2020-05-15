const express = require('express');
const router = express.Router();
const dbControl = require('../Controllers/dbControl');


router.get('/db' , dbControl.getdb);
router.get('/createdb' , dbControl.getCreateDb);


router.post('/createdb' , dbControl.postCreateDb);


module.exports = router;