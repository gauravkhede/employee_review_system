const mongoose=require('mongoose');

const reviewSchema=new mongoose.Schema({
    cooperation:{
        type:Number,
        required:true
    },
    punctual:{
        type:Number,
        required:true
    },
    work:{
        type:Number,
        required:true
    },
    creativity:{
        type:Number,
        required:true
    },
    adaptability:{
        type:Number,
        required:true
    },
    description:{
        type:String,

    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
});
const Review=mongoose.model('Review',reviewSchema);
module.exports=Review;