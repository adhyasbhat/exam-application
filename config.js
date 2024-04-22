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
       
    },
    email:{
        type:String,
       
    }
});
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
       
    },
    email:{
        type:String,
       
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
const q30Schema = new mongoose.Schema({
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


module.exports = {
    q10Schema: mongoose.model('q10', q10Schema),
    q20Schema: mongoose.model('q20', q20Schema),
    q30Schema: mongoose.model('q30', q30Schema),
    candidateSchema: mongoose.model('Candidate', candidateSchema),
    adminSchema: mongoose.model('Admin', adminSchema)
};