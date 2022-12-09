const itemsModel = require("../models/items.model");
const controllers = {};

controllers.getItems = async function (req, res) {
  try {
    const itemsInfo = await itemsModel.find({}).exec();
    res.status(200).json({
      status: 200,
      data: itemsInfo,
      description: {
        message: "Items fetched successfully!",
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

controllers.getOne = async function (req, res) {
  try {
    const itemsInfo = await itemsModel.findOne({ _id: req.body._id }).exec();
    res.status(200).json({
      status: 200,
      data: itemsInfo,
      description: {
        message: "Items fetched successfully!",
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

controllers.createItems = async function (req, res) {
  try {
    const newItem = new itemsModel(req.body);
    newItem.save();
    res.status(201).json({
      status: 201,
      data: newItem,
      description: {
        message: "Items has been created successfully!",
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

controllers.updateItem = async function (req, res) {
  try {
    const itemsInfo = await itemsModel.findOne(req.body.filter).exec();
    if (itemsInfo.length === 0) {
      res.status(200).json({
        status: 200,
        data: itemsInfo,
        description: {
          message: "Item is not created!",
          errorMessage: "",
        },
      });
    } else {
      const updateInfo = await itemsModel
        .updateOne(req.body.filter, { $set: req.body.update }, { new: true })
        .exec();
      res.status(200).json({
        status: 200,
        description: {
          message: "Items has been updated successfully!",
          errorMessage: "",
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      description: {
        message: "Error Found!",
        errorMessage: error.message,
      },
    });
  }
};

controllers.deleteItem = async function (req, res) {
  try {
    const itemsInfo = await itemsModel.find({ _id: req.body._id }).exec();
    if (itemsInfo.length === 0) {
      res.status(200).json({
        status: 200,
        data: itemsInfo,
        description: {
          message: "Item is not exist!",
          errorMessage: "",
        },
      });
    } else {
      const deleteItems = await itemsModel
        .deleteOne({ _id: req.body._id })
        .exec();
      res.status(200).json({
        status: 200,
        data: deleteItems,
        description: {
          message: "Items has been deleted successfully!",
          errorMessage: "",
        },
      });
    }
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
module.exports = controllers;
