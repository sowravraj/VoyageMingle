import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName :{
        type : String,
        required: true,
        min : 2,
        max : 100
    },
    lastName :{
        type : String,
        required : true,
        min : 2,
        max : 100
    },
    email :{
        type : String,
        required : true,
        unique : true,
        max : 100
    },
    password :{
        type : String,
        required : true,
        unique : true,
        min : 5
    },
    picturePath :{
        type : String,
        default : '',
    },
    friends :{
        type : Array,
        default : [],
    },
    location : String,
    occupation : String,
    viewedProfile : Number,
    impressions : Number
}, {timestamp : true} )



const User = mongoose.model('User',userSchema)

export default User;