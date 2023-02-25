const router = require('express').Router();
const {signUp,login} = require('../Controllers/userController')


router.post('/signup',signUp);
router.post('/login',login);

module.exports= router;