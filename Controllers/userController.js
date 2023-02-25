require('dotenv')
const bcrypt = require('bcrypt');
const _ = require('lodash');
const axios = require('axios');
const jwt = require('jsonwebtoken');
// const otpGenerator = require('otp-generator');


const { User } = require('../Model/userModel');


module.exports.signUp = async (req, res) => {
    const { userEmail, userPassword, userName } = req.body;

    try {
        const saltRounds = 10;
        const existingUser = await User.findOne({ userEmail });
        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists' });
        }


        const hashedPassword = await bcrypt.hash(userPassword, saltRounds);


        const newUser = { userEmail, userPassword: hashedPassword, userName };
        const createdUser = await User.create(newUser);

        const token = jwt.sign({ id: newUser.id }, process.env.TOKEN_SECRET);
        return res.json({ message: 'User created successfully', token: token, user: createdUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports.login = async (req, res) => {

    const { userEmail, userPassword } = req.body;
    console.log('userName', userEmail, userPassword);

    const user = await User.find({
        userEmail: userEmail
    });
    console.log("user", user)

    // If user not found or password is incorrect, return error
    if (!user || !await bcrypt.compare(userPassword, user[0].userPassword)) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token with the user ID and secret key
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
    return res.json({ token, user });
}