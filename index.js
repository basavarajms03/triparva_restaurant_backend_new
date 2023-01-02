const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const non_auth_routers = require("./routes/no-auth.routes");
const itemsRoutes = require("./routes/items.routes");
const orderRoutes = require("./routes/orders.routes");
const http = require("http");
require("dotenv").config();
require("./config/dbcon");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/v1/api/non-auth", non_auth_routers);
app.use("/v1/api/items", itemsRoutes);
app.use("/v1/api/orders", orderRoutes);

const socketIO = require("socket.io");

const server = http.createServer(app);

const io = socketIO(server, { cors: { origin: "*" } });

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(PORT, () => {
  console.log("Triparva application started in port number", PORT);
});
