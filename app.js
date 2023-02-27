require('dotenv/config')
const express = require('express');
const mongoose = require('mongoose');

var cors = require('cors')
const userRouter = require('./Routers/userRouter');
const itemRouter = require('./Routers/itemRouter');
const csvRouter = require('./Routers/csvRouter');
 

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user',userRouter);
app.use('/user/item',itemRouter)
app.use('/csv',csvRouter)


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
