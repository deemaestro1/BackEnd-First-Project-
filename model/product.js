import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
    {
    name:{type:String, requirerd:true},
    price:{type:String, requirerd:true},
    description:{type:String, requirerd:true},
    image:{type:String},
     stock:{type:String},
      image:{type:String},

},
{timestamps:true}
)
export const product = mongoose.model('product', productSchema)