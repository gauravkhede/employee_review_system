const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/employee_review_system');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error connecting to db'));
db.once('open',function(){
    console.log('Connection with database is successfull');
})