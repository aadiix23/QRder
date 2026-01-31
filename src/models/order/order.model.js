import mongoose, { modelNames } from "mongoose";
const orderItemSchema = new mongoose.Schema(
    {
        menuItemId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"MenuItem",
            required:true
        },
        name:{
            type:String,
            required:true
        },
        qty:{
            type:Number,
            required:true,
            min:1
        },
        price:{
            type:Number,
            required:true
        }
    },
    {_id:false}
);

const orderSchema = new mongoose.Schema
(
    {
        restaurantId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Restaurant",
            required:true,
            index:true
        },
        tableNumber:{
            type:Number,
            required:true
        },
        items:{
            type:[orderItemSchema],
            validate:[
                (val) => val.length > 0,
        "Order must have at least one item"
            ]
        },
        note:{
            type:String
        },
    status: {
      type: String,
      enum: [
        "NEW",
        "PREPARING",
        "READY",
        "SERVED",
        "CLOSED",
        "CANCELLED"
      ],
      default: "NEW",
      index: true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    source:{
        type:String,
        enum:["QR"],
        default:"QR"
    }    
    },
    {
        timestamps:true
    }
);

orderSchema.index({restaurantId:1,status:1});
export const Order = mongoose.model("Order",orderSchema)