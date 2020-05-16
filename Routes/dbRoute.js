const express = require('express');
const router = express.Router();
const dbControl = require('../Controllers/dbControl');


router.get('/db' , dbControl.getdb);
router.get('/createdb' , dbControl.getCreateDb);
router.get('/:dbname' , dbControl.getSpecificDb);
router.get('/:dbname/createcollection' , dbControl.getCreateCollecion);

router.post('/createdb' , dbControl.postCreateDb);
router.post('/:dbname/createcollection', dbControl.postCreateCollection);

module.exports = router;