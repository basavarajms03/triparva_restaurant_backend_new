const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection.on("connected", () => {
  console.log("Database has been connected!", process.env.DB_URL);
});
