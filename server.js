require('dotenv/config')

const express = require('express');
// 
// const app = express();
const mongoose = require('mongoose');

// const app = require('./app');



// const express = require( 'express');
// const app = express();
// const userRouter = require('./Routers/userRouter');

// app.use(express.json());

// app.use('/api/user',userRouter)




// const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Set up a secret key for JWT
const secretKey = 'your-secret-key-here';

// Set up a sample user database
const users = [
  { id: 1, username: 'user1', password: '$2b$10$Z7AgyJh.6ncwV76s.i8Ys.f/9hLlgTEUGTtZEHM8NQFtKlaorDbKW' }, // password: "password1"
  { id: 2, username: 'user2', password: '$2b$10$vR5Sg52d/5vmHDXMc8B4DuN4Mylq6vZU6kE8jjz2hSLrMBqfO7BBu' }  // password: "password2"
];

// Middleware to parse JSON request body
app.use(express.json());


app.get('/api', async (req, res) => {
    console.log("LLL:L:L:")
});

// Login endpoint
app.post('/login', async (req, res) => {
    console.log("claaa::::",req)
  const { username, password } = req.body;

  // Find the user with the given username
  const user = users.find(u => u.username === username);

  // If user not found or password is incorrect, return error
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Generate a JWT token with the user ID and secret key
  const token = jwt.sign({ id: user.id }, secretKey);

  // Return the JWT token to the client
  res.json({ token });
});

// Protected endpoint (requires JWT token)
app.get('/protected', (req, res) => {
  // Get the JWT token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  try {
    // Verify the JWT token using the secret key
    const payload = jwt.verify(token, secretKey);

    // Find the user with the ID from the JWT payload
    const user = users.find(u => u.id === payload.id);

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

// const port = process.env.PORT || 5000







const CONNECTION_URL = 'mongodb+srv://pneel2272:Hacker*1999@user.rabm24y.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(CONNECTION_URL,{
    useNewUrlParser: true, useUnifiedTopology: true 
})
.then(()=>console.log("connected"))
.catch((err)=>console.log("error"));

app.listen(5000,()=>{
    console.log("app run on port:5000");
})


