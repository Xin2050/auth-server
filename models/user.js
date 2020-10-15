const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


//Define our model

const userSchema = new Schema({
    email: {type: String, unique:true, lowercase:true },
    password: String,
    firstName:String,
    lastName:String,
    iskeep:{type:Boolean, default:false}
});

// On Save Hook, encrypt password;
//Before saving a model, run this function

userSchema.pre('save', function(next){ // HERE IS MUST NOT TO USING ARROW FUNCTION
    const user = this;

    //generate a salt then run callback
    bcrypt.genSalt(10, (err,salt) => {
        if(err){return next(err);}

        //hash(encrypt) our password using the salt
        bcrypt.hash(user.password,salt,null, (err,hash) => {
            if(err){return next(err);}

            //overwrite plain text password
            user.password = hash;
            next();
        })
    })
})

userSchema.methods.comparePassword =function (candidatePassword,callback) {// HERE IS MUST NOT TO USING ARROW FUNCTION

    bcrypt.compare(candidatePassword,this.password, (err,isMatch) => {
        if(err){return callback(err);}

        callback(null,isMatch);

    })

}



//Create the model class
const ModelClass = mongoose.model('user',userSchema);


//Export the model
module.exports = ModelClass;