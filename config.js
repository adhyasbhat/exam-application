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
       
    },
    option1:{
        type:String,
      
    },
    option2:{
        type:String,
      
    },
    option3:{
        type:String,
       
    },
    option4:{
        type:String,
        
    },
    answer:{
        type:String,
       
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

// const Candidate = mongoose.model('Candidate',candidateSchema);
// const Admin = mongoose.model('Admin',adminSchema);
// const Q10 = mongoose.model('q10',q10Schema);
// const Q20 = mongoose.model('Q20',q20Schema);
// const Q30 = mongoose.model('Q30',q30Schema);
// module.exports = {Candidate,Admin,q10,q20,Q30};
module.exports = {
    q10Schema: mongoose.model('q10', q10Schema),
    q20Schema: mongoose.model('q20', q20Schema),
    q30Schema: mongoose.model('q30', q30Schema),
    candidateSchema: mongoose.model('Candidate', candidateSchema),
    adminSchema: mongoose.model('Admin', adminSchema)
};