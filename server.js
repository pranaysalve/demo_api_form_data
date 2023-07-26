const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const DBURI = process.env.DBURI.replace("<password>", process.env.DBPASS);

mongoose
  .connect(DBURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("Error", err));

const PORT = process.env.PORT || 8282;
const server = app.listen(PORT, () => {
  console.log("server is listening to PORT: ", PORT);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection, server shutting down");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
process.on("SIGTERM", () => {
  console.log("SIGTERM, server shutting down");
  server.close(() => {
    console.log("Process terminated");
  });
});
