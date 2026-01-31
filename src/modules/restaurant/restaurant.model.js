import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    phone: {
      type: String
    },

    address: {
      type: String
    },

    plan: {
      type: String,
      enum: ["free", "basic", "pro"],
      default: "free"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export const Restaurant = mongoose.model(
  "Restaurant",
  restaurantSchema
);
