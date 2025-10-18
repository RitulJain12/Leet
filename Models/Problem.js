const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProblemSchema = new Schema({
    title: { type: String ,required: true},
  
    BoilerPlate:[
     {
        language: { type: String, required: true },
        Boilercode: { type: String, required: true }
     }
    ],
    complexity: {
        time: { type: String },
        space: { type: String }
    },
    description:{
        type:String,
        required:true
    },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    tags: { type: [String], index: true, default: [] }, 
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    createdAt: { type: Date, default: Date.now },
    visibleTestCases:[
        {input:{
            type:String,
            required:true
        },
    
        output:{
            type:String,
            required: true 
        },
        explanation:{
            type:String,
            required: true 
        }
    }
    ],
    invisibleTestCases:[
        {input:{
            type:String,
            required:true
        },
    
        output:{
            type:String,
            required: true 
        }
    }
    ]

});
  
const ProblemModel=mongoose.model('Problems',ProblemSchema);
module.exports=ProblemModel;