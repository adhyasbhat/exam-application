const mongoose=require('mongoose');
const {Schema}=mongoose;
const bookingSchema=new Schema({
    email:{
        type:String,
    },
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true
       
    },
    district:{
        type:String,
        required:true 
    }
});
module.exports=mongoose.model('booking',bookingSchema);