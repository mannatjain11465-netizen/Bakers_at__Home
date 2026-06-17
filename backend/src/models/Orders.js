const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },

  occasion: {
    type: String,
    required: true,
  },

  celebrant: {
    gender: String,
    age: Number,
  },

  guestCount: Number,

  deliveryDate: {
    type: Date,
    required: true,
  },

  deliveryTime: {
    type: String,
    required: true,
  },

  orderType: {
    type: String,
    enum: ["Pickup", "Delivery"],
    required: true,
  },

  address: String,

  items: {
    type: [
      {
        category: {
          type: String,
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        unit: {
          type: String,
          enum: ["cake", "box", "jar", "piece"],
          required: true,
        },

        weight: Number,

        flavour: String,

        unitPrice: {
          type: Number,
          required: true,
        },
      },
    ],

    validate: {
      validator: (arr) => arr.length > 0,
      message: "Order must contain at least one item",
    },
  },

  payment: {
    totalAmount: {
      type: Number,
      required: true,
    },

    advancePaid: {
      type: Number,
      default: 0,
    },

    remainingAmount: {
      type: Number,
      required: true,
    },
  },

  status: {
    type: String,
    enum: [
      "Inquiry",
      "Quoted",
      "Confirmed",
      "In Progress",
      "Ready",
      "Delivered",
      "Cancelled",
    ],
    default: "Inquiry",
  },

  discussionNotes: String,

  referenceImages: [String],
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("Order", orderSchema);