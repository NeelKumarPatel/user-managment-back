const verifyToken = require('./validateRouter');
const router = require('express').Router();
const { addItem, getItem, updateItem, deleteItem } = require('../Controllers/itemController');

router.post('/add-item', verifyToken, addItem);
router.get('/list-item', verifyToken, getItem);
router.put('/update-item', verifyToken, updateItem);
router.delete('/delete-item', verifyToken, deleteItem);

module.exports = router;