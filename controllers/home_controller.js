const User = require("../models/user");

module.exports.home=function(req,res){
    let role=res.locals.user.role;
    let main_user=res.locals.user;
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