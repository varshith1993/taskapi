const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userScheme = new mongoose.Schema({
         name:{
             type:String,
             required:true,
             trim:true,
             unique: true
         },
        email:{
            type:String,
            required: true,
            unique:true,
            trim:true,
            lowercase:true,
            validate(value) {
                if(!validator.isEmail(value)){
                    throw new Error('Email is invalid')
                }
            }
         },
       password:{
           type:String,
           required:true,
           trim:true,
           minlength:8,
       },
       age:{
           type:Number,
           required:true,
           validate(value){
               if(value <= 0){
                   throw new Error('Age should be positive number')
               }
           }
       }
})


userScheme.statics.findByCredentials = async(email, password ) => {
     const user = await User.findOne({ email })
     if(!user){
         throw new Error('unable to login')
     }
     const userpass = await bcrypt.compare(password, user.password)
     if(!userpass){
         throw new Error('unable to login')
     }
     return user
}

userScheme.pre('save', async function(next){
 const user = this
 if(user.isModified('password')){
     user.password = await bcrypt.hash(user.password, 8)
 }
next()
})

const User = mongoose.model('User', userScheme)

module.exports = User