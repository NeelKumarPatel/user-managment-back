const verifyToken = require('./validateRouter');
const router = require('express').Router();
const { downloadCSV } = require('../Controllers/csvController');

router.get('/download',  downloadCSV);


module.exports= router;