const express = require('express');
const router = express.Router();
const Control = require('../Controllers/ApiControl');

router.get('/api' ,Control.DbApiControl);
router.get('/api/:dbname' , Control.specificDb )
router.get('/api/:dbname/:collectionname',Control.speecificCollection);
router.get('/api/:dbname/:collectionname/:index',Control.specificDataEntry);









module.exports = router;