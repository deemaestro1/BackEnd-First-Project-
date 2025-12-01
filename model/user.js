import mongoose from "mongoose";
const cohortfourSchema = new mongoose.Schema({
    name:{type:String, required:true},
     email:{type:String, required:true, unique:true},
     phoneNumber:{type:String, required:true, unique:true},
     password:{type:String, required:false},
     country:{type:String, required:true},
     state:{type:String, required:true},
     address:{type:String, required:false},
     userName:{type:String, required:false},
},
{timestamps: true}
    
)
const cohortfour = mongoose.model("cohortfour", cohortfourSchema)
export default cohortfour
