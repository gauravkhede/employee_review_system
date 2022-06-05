const express=require('express');
const port=8000;
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const app=express();
var http=require('http');
const server=http.createServer();
const path=require('path');
const router=require('./routes/index');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(session({
    name:'employee_review_system',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({mongoUrl:'mongodb://localhost/employee_review_system'}),function(err){
        console.log(err || 'connect mongodb setup ok');
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(express.urlencoded());
app.use(express.static('assets'));
app.use('/',require('./routes'));

app.listen(process.env.PORT || port,function(err){
    if(err){ console.log(err); return; }
    console.log('app is up and running on port 8000');
})