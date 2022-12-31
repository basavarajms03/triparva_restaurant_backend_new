const mongoose = require("mongoose");

const orderSubDocument = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  cashAdded: {
    type: String,
    required: false,
  },
  singlePrice: {
    type: String,
    required: false,
  },
  price: {
    type: String,
  },
  kot: {
    quantity: 0,
    taken: false,
  },
});

const orderSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: String,
      required: true,
    },
    supplierName: {
      type: String,
    },
    tableNumber: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: false,
    },
    customerPhoneNumber: {
      type: String,
      required: false,
    },
    orders: [orderSubDocument],
    cashPaid: {
      type: String,
      required: false,
    },
    paidBy: {
      type: String,
      required: false,
    },
    total: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const ordersModel = mongoose.model("orders", orderSchema);

module.exports = ordersModel;
