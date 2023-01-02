const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const non_auth_routers = require("./routes/no-auth.routes");
const itemsRoutes = require("./routes/items.routes");
const orderRoutes = require("./routes/orders.routes");

// Socket server
const { socketIO } = require("socket.io");
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

// Create server
const server = http.createServer(app);

// IO socket connect
const io = new socketIO(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
});

server.listen(PORT, () => {
  console.log("Triparva application started in port number", PORT);
});
