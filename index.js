const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const non_auth_routers = require("./routes/no-auth.routes");
const itemsRoutes = require("./routes/items.routes");
const orderRoutes = require("./routes/orders.routes");
const socketIO = require("socket.io");
require("dotenv").config();
require("./config/dbcon");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/v1/api/non-auth", non_auth_routers);
app.use("/v1/api/items", itemsRoutes);
app.use("/v1/api/orders", orderRoutes);

const io = socketIO(
  app.listen(PORT, () => {
    console.log("Triparva application started in port number", PORT);
  })
);

const getApiAndEmit = "TODO";
