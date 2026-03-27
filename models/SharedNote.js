const mongoose = require('mongoose');

const sharedNoteSchema = new mongoose.Schema({
    note:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Note",
        required:true,
    },

    sharedWith:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    permission:{
        type:String,
        enum:["read","write"],
        default:"read",
    }
},{
    timestamps:true,
})

module.exports = mongoose.model('SharedNote', sharedNoteSchema);