const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/Exam');

connect.then(()=>{
    console.log('Connected to the server');
})
.catch(()=>{
    console.log('Error in connecting to the server');
})
const candidateSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
});
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
});
const q10Schema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    option1:{
        type:String,
        required:true
    },
    option2:{
        type:String,
        required:true
    },
    option3:{
        type:String,
        required:true
    },
    option4:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }
});
const q20Schema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    option1:{
        type:String,
        required:true
    },
    option2:{
        type:String,
        required:true
    },
    option3:{
        type:String,
        required:true
    },
    option4:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }
});
const q30Schema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    option1:{
        type:String,
        required:true
    },
    option2:{
        type:String,
        required:true
    },
    option3:{
        type:String,
        required:true
    },
    option4:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }
});

const Candidate = mongoose.model('Candidate',candidateSchema);
const Admin = mongoose.model('Admin',adminSchema);
const Q10 = mongoose.model('Q10',q10Schema);
const Q20 = mongoose.model('Q20',q20Schema);
const Q30 = mongoose.model('Q30',q30Schema);
module.exports = {Candidate,Admin,Q10,Q20,Q30};