const User=require('../models/user');
const fs=require('fs');
const path=require('path');


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
    let user=await User.findById(req.params.id);
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
    console.log(req.body.profile_user);
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