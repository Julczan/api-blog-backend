const express = require("express");
const app = express();
const cors = require("cors");
const models = require("./models/index");
const routes = require("./routes/index");

require("dotenv/config");
require("./config/passport");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});

app.use("/posts", routes.post);
app.use("/user", routes.user);

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({ error: error.toString() });
});

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
