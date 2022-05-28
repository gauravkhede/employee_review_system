const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    sex:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'Employee',
        enum:['Employee','Admin']
    },
    reviewPending:{
        type:[String],
    },
    reviewGot:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Review'
    }
},{
    timestamps:true
});
const User=mongoose.model('User',userSchema);
module.exports=User;