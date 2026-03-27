const mongoose=require("mongoose");

const attachmentSchema=new mongoose.Schema({
    fileUrl:String,
    publicId:String,

    note:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Note",
        required:true,
    },

    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }
},{
    timestamps:true,
})

module.exports=mongoose.model("Attachment",attachmentSchema);