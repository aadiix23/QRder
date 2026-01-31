import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurent",
        required:true,
        index:true
    },
    tableNumber:{
        type:Number,
        required:true
    },
    qrCodeUrl:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    }
},
{
    timestamps:true
}
);
tableSchema.index(
    {restaurantId:1,tableNumber:1},
    {unique:true}
);

export const Table = mongoose.model("Table",tableSchema);