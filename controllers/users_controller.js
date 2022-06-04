const User=require('../models/user');
const fs=require('fs');
const path=require('path');
const Review = require('../models/review');


module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    res.render('signIn',{
        title:'users | sign in',
    });
}
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/profile');
    }
    res.render('signUp',{
        title:'users | sign Up',
    });
}
//get the signup data
module.exports.create=function(req,res){
    //TODO later
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({ email:req.body.email},function(err,user){
        if(err){ console.log('error in findng user in signing in'); return }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){ console.log('error in creating user while signing up'); return }
                return res.redirect('/user-signin');
            });
        }else{
            // console.log('email already present');
            return res.redirect('back');
        }
    });
}
//sign in and create session for user
module.exports.createSession=function(req,res){
    // console.log('create session called');
    return res.redirect('/');
}
module.exports.profile=async function(req,res){
    let user=await User.findById(req.params.id).populate({
        path:'reviewGot',
        populate:{
            path:'author',
        }
    });
    let all_users=await User.find({});
    let role=res.locals.user.role;
        res.render('profile',{
            title:'users view',
            profile_user:user,
            users:all_users,
            role:role
        });
    
}
module.exports.reviewToBeGiven=async function(req,res){
    console.log(req.body.ReviewToBeGiven," is reviewToBeGiven");
    console.log(req.body.ReviewToBeGiven.length," is the length of ReviewToBeGiven");
    console.log(typeof req.body.ReviewToBeGiven," is the type of review to be given");
    if(typeof req.body.ReviewToBeGiven=="string"){
        await User.updateOne( { "_id" : req.body.ReviewToBeGiven },{ $push: { "reviewPending": req.body.profile_user } });
        return res.redirect('/');
    }
    console.log(req.body.profile_user);
    console.log(req.body.reviewToBeGiven," is review to be given");
    let reviewedUser=await User.findById(req.body.profile_user);
    console.log(reviewedUser.name+" is reviewed user");
    for(user of req.body.ReviewToBeGiven){
        let addField=await User.findById(user);
        await User.updateOne( { "_id" : user },{ $push: { "reviewPending": req.body.profile_user } });
    }

}
//for signout
module.exports.destroySession= function(req,res){
    
    req.logout(function(err) {
        if (err) { return next(err); }
       return res.redirect('/user-signin');
      });
    // return res.redirect('/user-signin');
}
//to create review
module.exports.reviewPage=async function(req,res){
    let reviewPending=await User.findById(req.params.reviewPending).populate('reviewPending');
    return res.render('review',{
        reviewPending:reviewPending
    });
}
module.exports.reviewCreate=async function(req,res){
        // console.log(req.body.pendingReviewedPerson+" is the requested Body");
        let reviewToBeUpdate=await Review.find({author:req.body.author});
        console.log(reviewToBeUpdate.length);
        if(reviewToBeUpdate.length==1){
            const updateDocumentCooperation={
                $set:{
                    cooperation:req.body.cooperation
                }
            };
            const updateDocumentPunctual={
                $set:{
                    punctual:req.body.punctual
                }
            };
            const updateDocumentWork={
                $set:{
                    work:req.body.work
                }
            };
            const updateDocumentCreativity={
                $set:{
                    creativity:req.body.creativity
                }
            };
            const updateDocumentAdaptability={
                $set:{
                    adaptability:req.body.adaptability
                }
            };
            const updateDocumentDescription={
                $set:{
                    description:req.body.description
                }
            };
            await Review.updateOne({_id:reviewToBeUpdate[0]._id},updateDocumentCooperation);
            await Review.updateOne({_id:reviewToBeUpdate[0]._id},updateDocumentPunctual);
            await Review.updateOne({_id:reviewToBeUpdate[0]._id},updateDocumentWork);
            await Review.updateOne({_id:reviewToBeUpdate[0]._id},updateDocumentCreativity);
            await Review.updateOne({_id:reviewToBeUpdate[0]._id},updateDocumentAdaptability);
            await Review.updateOne({_id:reviewToBeUpdate[0]._id},updateDocumentDescription);

            return res.redirect('back');
        }
        Review.create({
            cooperation:req.body.cooperation,
            punctual:req.body.punctual,
            work:req.body.work,
            creativity:req.body.creativity,
            adaptability:req.body.adaptability,
            description:req.body.description,
            author:req.body.author,
        },async function(err,newReview){
            if(err){ console.log('error in creating a review',err); return; }
            await User.updateOne( { "_id" : req.body.pendingReviewedPerson },{ $push: { "reviewGot": newReview } });
            let authorObject=await User.findById(req.body.author).populate('allReview');
            authorObject.allReview.push(newReview);
            await User.findByIdAndUpdate(authorObject._id, { $pull: { reviewPending:req.body.pendingReviewedPerson }});
            authorObject.save();
            return res.redirect('/');
        });

}
module.exports.updateProfile=async function(req,res){
        let user=await User.findById(req.body.profile_user);
        const updateDocumentName={
            $set:{
                name:req.body.name
            }
        };
        const updateDocumentEmail={
            $set:{
                email:req.body.email
            }
        };
        const updateDocumentAge={
            $set:{
                age:req.body.age
            }
        };
        const updateDocumentSex={
            $set:{
                sex:req.body.sex
            }
        };
        await User.updateOne({_id:user},updateDocumentName);
        await User.updateOne({_id:user},updateDocumentEmail);
        await User.updateOne({_id:user},updateDocumentAge);
        await User.updateOne({_id:user},updateDocumentSex);
        return res.redirect('/');
}
module.exports.removeUser=async function(req,res){
        let userToBeDelete=await User.findById(req.params.user).populate('allReview');
        let reviewByAuthor=await Review.find({author:req.params.user}).populate('author');
        
        for(review of reviewByAuthor){
            review.remove();
        }
        
        userToBeDelete.remove();
        return res.redirect('back');
}
module.exports.updateRole=async function(req,res){
    let profile_user=await User.findById(req.body.profile_user);
    const updateDocumentRole={
        $set:{
            role:req.body.role
        }
    };
    await User.updateOne({_id:profile_user},updateDocumentRole);
    return res.redirect('back');

}