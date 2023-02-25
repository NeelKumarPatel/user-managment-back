const { Schema, model } = require('mongoose');

const itemSchema = Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
},
    {
        timestamps: true
    }
);




module.exports.Item = model('Item', itemSchema);