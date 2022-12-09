const express = require("express");
const ordersController = require("./../controllers/orders.controller");
const router = express.Router();

router.post("/createorder", (req, res) => {
  ordersController.createOrders(req, res);
});

router.post("/updateorder", (req, res) => {
  ordersController.updateOrders(req, res);
});

router.get("/getorders", (req, res) => {
  ordersController.getOrders(req, res);
});

router.get("/getinvoiceid", (req, res) => {
  ordersController.getInvoiceId(req, res);
});

router.post("/checkfortablenumber", (req, res) => {
  ordersController.checkForTableNumber(req, res);
});

router.get("/everydaydata", (req, res) => {
  ordersController.everyDay(req, res);
});

router.get("/getcancelledorders", (req, res) => {
  ordersController.getCancelledOrders(req, res);
});

router.post("/findOrders", (req, res) => {
  ordersController.findOrders(req, res);
});

module.exports = router;
