require('dotenv/config')
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var cors = require('cors')
const { User } = require('./Model/userModel');
const userRouter = require('./Routers/userRouter');
const itemRouter = require('./Routers/itemRouter');
 

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Login endpoint
// app.post('/user',userRouter);
app.use('/user',userRouter);
app.use('/user/item',itemRouter)

// Protected endpoint (requires JWT token)
app.get('/protected',async (req, res) => {
    // Get the JWT token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    try {
        // Verify the JWT token using the secret key
        const payload = jwt.verify(token, secretKey);
        console.log(payload)

        // Find the user with the ID from the JWT payload
        const user =await User.find(u => u.id === payload.id);

        // If user not found, return error
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Return a protected response
        res.json({ message: `Hello, ${user.username}! This is a protected response.` });
    } catch (err) {
        // Return error if JWT token is invalid or expired
        res.status(401).json({ error: 'Invalid or expired token' });
    }
});




const CONNECTION_URL = 'mongodb+srv://pneel2272:Hacker*1999@user.rabm24y.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    .then(() => console.log("connected"))
    .catch((err) => console.log("error", err));

app.listen(5000, () => {
    console.log("app run on port:5000");
})




module.exports = app;
