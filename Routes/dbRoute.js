const express = require('express');
const router = express.Router();
const dbControl = require('../Controllers/dbControl');


router.get('/db' , dbControl.getdb);
router.get('/db/createdb' , dbControl.getCreateDb);
router.get('/:dbname' , dbControl.getSpecificDb);
router.get('/:dbname/createcollection' , dbControl.getCreateCollecion);
router.get('/:dbname/:collectionname',dbControl.getSpecificCollection);


router.post('/createdb' , dbControl.postCreateDb);
router.post('/:dbname/createcollection', dbControl.postCreateCollection);

module.exports = router;