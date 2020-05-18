const express = require('express');
const router = express.Router();
const Control = require('../Controllers/dataControl');

router.get('/:dbname/:collectionname/insertdata' , Control.getInsertData);
router.get('/:dbname/:collectionname/show');


router.post('/:dbname/:collectionname/insertdata' , Control.postInsertData);


module.exports = router;