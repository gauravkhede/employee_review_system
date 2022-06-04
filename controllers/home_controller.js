const User = require("../models/user");

module.exports.home=async function(req,res){
    let role=res.locals.user.role;
    let main_user=await User.findById(res.locals.user).populate('reviewPending').populate('reviewGot');
    console.log(role," is user");
    User.find({},function(err,users){
        if(err){ console.log('Error in finding all users',err); return; }
        res.render('home',{
            role:role,
            users:users,
            main_user:main_user
    
        });
    })
    
}
module.exports.signIn=function(req,res){
    return res.redirect('/user-signin');
}