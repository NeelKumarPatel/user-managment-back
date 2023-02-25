const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = Schema({

    // number: {
    //     type: String,
    //     required: true
    // },
    userEmail:{
        type: String,
        required: true
    },
    userPassword:{
        type: String,
        // required: true
    },
    userName:{
        type: String,
        required: true
    },
    items: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Item'
        }
      ]

},
    {
        timestamps: true
    }
);

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        number: this.number
    }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
    return token
}


module.exports.User = model('User', userSchema);