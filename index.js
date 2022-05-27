const express=require('express');
const port=8000;
const db=require('./config/mongoose');
const app=express();
var http=require('http');
const server=http.createServer();
const path=require('path');
const router=require('./routes/index');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());
app.use(express.static('assets'));
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){ console.log(err); return; }
    console.log('app is up and running on port 8000');
})