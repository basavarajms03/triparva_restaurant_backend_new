const ordersModel = require("../models/orders.model");

ordersController = {};

ordersController.getCancelledOrders = async function (req, res) {
  try {
    const ordersData = await ordersModel.find({ cashPaid: "Cancel" });
    res.status(200).json({
      status: 200,
      data: ordersData,
      description: {
        message: "Order has been fetched successfully!",
        errorMessage: "",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      description: {
        message: "Error Found!",
        errorMessage: error,
      },
    });
  }
};

ordersController.getInvoiceId = async function (req, res) {
  try {
    const ordersData = await ordersModel.find({}).count();
    res.status(200).json({
      status: 200,
      invoiceId: "TR0000" + (ordersData + 1),
      description: {
        message: "Order has been fetched successfully!",
        errorMessage: "",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      description: {
        message: "Error Found!",
        errorMessage: error,
      },
    });
  }
};

ordersController.getOrders = async function (req, res) {
  try {
    const ordersData = await ordersModel.find({
      cashPaid: { $nin: ["Paid", "Cancel"] },
    });
    res.status(200).json({
      status: 200,
      data: ordersData,
      description: {
        message: "Order has been fetched successfully!",
        errorMessage: "",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      description: {
        message: "Error Found!",
        errorMessage: error,
      },
    });
  }
};

ordersController.checkForTableNumber = async function (req, res) {
  try {
    const ordersData = await ordersModel
      .findOne({
        $and: [
          {
            cashPaid: { $nin: ["Paid", "Cancel"] },
            tableNumber: req.body.tableNumber,
          },
        ],
      })
      .exec();
    res.status(200).json({
      status: 200,
      data: ordersData,
      description: {
        message: "Order has been fetched successfully!",
        errorMessage: "",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      description: {
        message: "Error Found!",
        errorMessage: error,
      },
    });
  }
};

ordersController.createOrders = async function (req, res) {
  try {
    const ordersData = new ordersModel(req.body);
    ordersData.save();
    res.status(200).json({
      status: 200,
      description: {
        message: "Order has been created successfully!",
        errorMessage: "",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      description: {
        message: "Error Found!",
        errorMessage: error,
      },
    });
  }
};

ordersController.updateOrders = async function (req, res) {
  try {
    const ordersData = await ordersModel
      .findOneAndUpdate(
        req.body.filter,
        { $set: req.body.update },
        { new: true }
      )
      .exec();
    res.status(200).json({
      status: 200,
      updated: ordersData,
      description: {
        message: "Order has been updated successfully!",
        errorMessage: "",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      description: {
        message: "Error Found!",
        errorMessage: error,
      },
    });
  }
};

ordersController.everyDay = async function (req, res) {
  try {
    let startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    let endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    let dashboardData = {};
    const ordersData = await ordersModel.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalPrice: { $sum: "$total" },
          count: { $sum: 1 },
        },
      },
    ]);
    dashboardData["orders"] = ordersData;
    // Get the number of order records created today
    dashboardData["totalOrders"] = await ordersModel
      .find({
        createdAt: { $gt: startDate, $lt: endDate },
      })
      .countDocuments();
    // Get the avg customers information
    const customersInfo = await ordersModel.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
    ]);
    let totalCustomers = 0;
    for (let index = 0; index < customersInfo.length; index++) {
      const element = customersInfo[index];
      totalCustomers = totalCustomers + element.count;
    }
    dashboardData["avgCustomers"] = Math.ceil(
      totalCustomers / customersInfo.length
    );
    // result information
    res.status(200).json({
      status: 200,
      data: dashboardData,
      description: {
        message: "Order has been updated successfully!",
        errorMessage: "",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      description: {
        message: "Error Found!",
        errorMessage: error,
      },
    });
  }
};

ordersController.findOrders = async function (req, res) {
  try {
    const ordersData = await ordersModel.find(req.body.filter);
    res.status(200).json({
      status: 200,
      data: ordersData,
      description: {
        message: "Order has been fetched successfully!",
        errorMessage: "",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      description: {
        message: "Error Found!",
        errorMessage: error,
      },
    });
  }
};

module.exports = ordersController;
