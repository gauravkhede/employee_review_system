const mongoose=require('mongoose');
//gaurav
//0HRej0lZoyyKPP9w
mongoose.connect('mongodb+srv://gaurav:0HRej0lZoyyKPP9w@cluster0.bwb5s.mongodb.net/employee-review-system?retryWrites=true');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error connecting to db'));
db.once('open',function(){
    console.log('Connection with database is successfull');
})