const userModel = require("../models/userModel");
const controllers = {};

controllers.createUser = async function (req, res) {
  try {
    const checkUserExist = await userModel
      .find({ userType: req.body.userType })
      .exec();
    if (checkUserExist.length === 0) {
      let createUser = new userModel(req.body);
      createUser.save();
    } else {
      throw Error("User is already exist!");
    }
    res.status(200).json({
      status: 200,
      description: {
        message: "User has been created successfully!",
        errorMessage: "",
      },
    });
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

controllers.login = async function (req, res) {
  try {
    const userExist = await userModel.findOne(req.body).exec();
    if (userExist) {
      res.status(200).json({
        status: 200,
        data: userExist,
        description: {
          message: "User logged in successfully!",
          errorMessage: "",
        },
      });
    } else {
      res.status(401).json({
        status: 401,
        description: {
          message: "User is not exist! Please try again",
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
